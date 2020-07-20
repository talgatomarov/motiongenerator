import os
import luigi
from luigi.contrib.gcs import GCSClient
from sklearn.model_selection import train_test_split


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

if __name__ == '__main__':
    luigi.run()

