import os
import luigi
from luigi.contrib.gcs import GCSClient


class DownloadDataset(luigi.Task):
    dataset_path=luigi.Parameter()

    def run(self):
        client = GCSClient()

        fp = client.download(self.dataset_path)
        self.output().makedirs()

        os.replace(fp.name, self.output().path)

    def output(self):
        return luigi.LocalTarget('./data/motions.txt')

if __name__ == '__main__':
    luigi.run()

