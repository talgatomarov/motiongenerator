import os
import luigi
import json
import shutil
import wandb
from google.oauth2 import service_account
from luigi.contrib.gcs import GCSClient
from sklearn.model_selection import train_test_split

from transformers import GPT2Tokenizer, GPT2LMHeadModel
from transformers.data.datasets.language_modeling import TextDataset
from transformers import DataCollatorForLanguageModeling
from transformers import Trainer, TrainingArguments


class DownloadDataset(luigi.Task):
    bucket = luigi.Parameter()
    filename = luigi.Parameter()

    def run(self):
        service_account_info = json.loads(os.environ.get('GOOGLE_APPLICATION_CREDENTIALS_JSON'))
        credentials = service_account.Credentials.from_service_account_info(service_account_info)

        client = GCSClient(oauth_credentials=credentials)

        file_path = f'{self.bucket}/{self.filename}'

        fp = client.download(file_path)
        self.output().makedirs()

        os.replace(fp.name, self.output().path)

    def output(self):
        data_folder = luigi.configuration.get_config().get('GlobalConfig', 'data_folder')
        return luigi.LocalTarget(os.path.join(data_folder, 'motions.txt'))


class PreprocessDataset(luigi.Task):
    bos_token = luigi.Parameter(default='<|endoftext|>')
    eos_token = luigi.Parameter(default='<|endoftext|>')

    def requires(self):
        return DownloadDataset()

    def run(self):
        with self.input().open('r') as f:
            motions = f.readlines()

        motions_prep = list(map(lambda motion: f"{self.bos_token} {motion[:-1]} {self.eos_token}\n", motions))

        with self.output().open('w') as f:
            f.writelines(motions_prep)

    def output(self):
        data_folder = luigi.configuration.get_config().get('GlobalConfig', 'data_folder')
        return luigi.LocalTarget(os.path.join(data_folder, 'motions_prep.txt'))


class SplitDataset(luigi.Task):
    test_size = luigi.FloatParameter(default=0.1)
    random_state = luigi.FloatParameter(default=12)

    def requires(self):
        return PreprocessDataset()

    def run(self):
        with self.input().open('r') as f:
            motions = f.readlines()

        train, test = train_test_split(motions,
                                       test_size=self.test_size,
                                       random_state=self.random_state)

        with self.output()['train'].open('w') as f:
            f.writelines(train)

        with self.output()['test'].open('w') as f:
            f.writelines(test)

    def output(self):
        data_folder = luigi.configuration.get_config().get('GlobalConfig', 'data_folder')
        return {'train': luigi.LocalTarget(os.path.join(data_folder, 'train.txt')),
                'test': luigi.LocalTarget(os.path.join(data_folder, 'test.txt'))}


class Train(luigi.Task):
    block_size = luigi.IntParameter(default=128)
    do_train = luigi.BoolParameter(default=True)
    do_eval = luigi.BoolParameter(default=True)
    evaluate_during_training = luigi.BoolParameter(default=True)
    logging_steps = luigi.IntParameter(default=100)
    eval_steps = luigi.IntParameter(default=100)
    gradient_accumulation_steps = luigi.IntParameter(default=1)
    learning_rate = luigi.FloatParameter(default=5e-5)
    seed = luigi.IntParameter(default=42)
    max_grad_norm = luigi.FloatParameter(default=1.0)
    num_train_epochs = luigi.IntParameter(default=1)
    per_device_train_batch_size = luigi.IntParameter(default=1)
    per_device_eval_batch_size = luigi.IntParameter(default=1)
    warmup_steps = luigi.IntParameter(default=100)
    weight_decay = luigi.FloatParameter(default=0)
    save_steps = luigi.IntParameter(default=0)


    def requires(self):
        return SplitDataset()

    def run(self):
        result_folder = luigi.configuration.get_config().get('GlobalConfig', 'result_folder')
        model = GPT2LMHeadModel.from_pretrained("distilgpt2")
        tokenizer = GPT2Tokenizer.from_pretrained("distilgpt2")

        train_dataset = TextDataset(tokenizer, self.input()['train'].path, block_size=self.block_size)
        test_dataset = TextDataset(tokenizer, self.input()['test'].path, block_size=self.block_size)

        data_collator = DataCollatorForLanguageModeling(
            tokenizer=tokenizer, mlm=False
        )

        training_args = TrainingArguments(
            do_eval=self.do_eval,
            do_train=self.do_train,
            eval_steps=self.eval_steps,
            evaluate_during_training=self.evaluate_during_training,
            gradient_accumulation_steps=self.gradient_accumulation_steps,
            logging_dir='./logs',
            logging_steps=self.logging_steps,
            learning_rate=self.learning_rate,
            max_grad_norm=self.max_grad_norm,
            num_train_epochs=self.num_train_epochs,
            output_dir=result_folder,
            overwrite_output_dir=True,
            per_device_train_batch_size=self.per_device_train_batch_size,
            per_device_eval_batch_size=self.per_device_eval_batch_size,
            save_steps=self.save_steps,
            seed=self.seed,
            warmup_steps=self.warmup_steps,
            weight_decay=self.weight_decay,
        )

        trainer = Trainer(
            model=model,
            args=training_args,
            data_collator=data_collator,
            train_dataset=train_dataset,
            eval_dataset=test_dataset
        )

        trainer.train()

        trainer.save_model()
        wandb.run.save()
        wandb.join()

        with open(self.output()['run_name'].path, 'w') as f:
            f.write(wandb.run.name)

    def output(self):
        result_folder = luigi.configuration.get_config().get('GlobalConfig', 'result_folder')
        return {'results': luigi.LocalTarget(result_folder),
                'run_name': luigi.LocalTarget(os.path.join(result_folder, 'run_name.txt'))}



class UploadToGCS(luigi.Task):
    bucket = luigi.Parameter()

    def requires(self):
        return Train()

    def run(self):
        result_folder = self.input()['results'].path

        with open(self.input()['run_name'].path, 'r') as f:
            run_name = f.read()

        zipfile_name = shutil.make_archive(run_name, 'zip', result_folder)

        service_account_info = json.loads(os.environ.get('GOOGLE_APPLICATION_CREDENTIALS_JSON'))
        credentials = service_account.Credentials.from_service_account_info(service_account_info)

        client = GCSClient(oauth_credentials=credentials)

        client.put(zipfile_name, f"{self.bucket}/{run_name}.zip")


if __name__ == '__main__':
    luigi.run()
