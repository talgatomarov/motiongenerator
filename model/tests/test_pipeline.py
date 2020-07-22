import os
import luigi
import pytest
from unittest.mock import MagicMock

from model.main import Train, DownloadDataset, SplitDataset, PreprocessDataset
from luigi.execution_summary import LuigiStatusCode

import wandb
wandb.run = MagicMock()

test_bucket = 'gs://motiongenerator'
test_filename = 'motions_test.txt'
bos_token = '<|endoftext|>'
eos_token = '<|endoftext|>'


def test_env_vars():
    assert 'WANDB_API_KEY' in os.environ
    assert 'WANDB_PROJECT' in os.environ
    assert 'WANDB_WATCH' in os.environ
    assert os.environ['WANDB_WATCH'] == 'all'
    assert 'GOOGLE_APPLICATION_CREDENTIALS_JSON' in os.environ



def test_run():
    result = luigi.build([DownloadDataset(bucket=test_bucket, filename=test_filename),
                          PreprocessDataset(eos_token=eos_token, bos_token=bos_token),
                          SplitDataset(),
                          Train(num_train_epochs=1, block_size=64)],
                          local_scheduler=True, detailed_summary=True)

    assert result.status == LuigiStatusCode.SUCCESS or \
           result.status == LuigiStatusCode.SUCCESS_WITH_RETRY



def test_download():
    assert os.path.isfile(f'./data/{test_filename}') # dataset was not downloaded







