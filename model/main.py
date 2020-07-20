import os
import luigi
from luigi.contrib.gcs import GCSClient
from sklearn.model_selection import train_test_split

from transformers import GPT2Tokenizer, GPT2LMHeadModel
from transformers.data.datasets.language_modeling import TextDataset
from transformers import DataCollatorForLanguageModeling
from transformers import Trainer, TrainingArguments


class DownloadDataset(luigi.Task):
    dataset_path=luigi.Parameter()

    def run(self):
        client = GCSClient()

        fp = client.download(self.dataset_path)
        self.output().makedirs()

        os.replace(fp.name, self.output().path)

    def output(self):
        return luigi.LocalTarget('./data/motions.txt')

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
        return luigi.LocalTarget('./data/motions_prep.txt')


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
        return {'train': luigi.LocalTarget('./data/train.txt'),
                'test': luigi.LocalTarget('./data/test.txt')}

class Train(luigi.Task):
    block_size = luigi.IntParameter(default=128)

    def requires(self):
        return SplitDataset()

    def run(self):
        model = GPT2LMHeadModel.from_pretrained("distilgpt2")
        tokenizer = GPT2Tokenizer.from_pretrained("distilgpt2")

        train_dataset = TextDataset(tokenizer, self.input()['train'].path, block_size=self.block_size)
        test_dataset = TextDataset(tokenizer, self.input()['test'].path, block_size=self.block_size)

        data_collator = DataCollatorForLanguageModeling(
            tokenizer=tokenizer, mlm=False
        )


        training_args = TrainingArguments(
            output_dir='./results',
            overwrite_output_dir=True,
            num_train_epochs=1,
            per_device_train_batch_size=12,
            per_device_eval_batch_size=16,
            warmup_steps=500,
            weight_decay=0.01,
            logging_dir='./logs',
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


if __name__ == '__main__':
    luigi.run()

