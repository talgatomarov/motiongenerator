import os
import luigi
import pytest

from model.main import Train, DownloadDataset, SplitDataset, PreprocessDataset
from luigi.execution_summary import LuigiStatusCode


test_bucket = 'gs://motiongenerator'
test_filename = 'motions_test.txt'


def test_env_vars():
    assert 'WANDB_API_KEY' in os.environ
    assert 'WANDB_PROJECT' in os.environ
    assert 'WANDB_WATCH' in os.environ
    assert os.environ['WANDB_WATCH'] == 'all'
    assert 'GOOGLE_APPLICATION_CREDENTIALS_JSON' in os.environ



def test_run():
    result = luigi.build([DownloadDataset(bucket=test_bucket, filename=test_filename)],
                          local_scheduler=True, detailed_summary=True)

    assert result.status == LuigiStatusCode.SUCCESS or \
           result.status == LuigiStatusCode.SUCCESS_WITH_RETRY



def test_download():
    assert os.path.isfile(f'./data/{test_filename}') # dataset was not downloaded







