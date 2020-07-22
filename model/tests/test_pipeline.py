import os
import shutil
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


test_data_folder = 'tests/data_test'
motions_file = 'motions.txt'
motions_prep_file = 'motions_prep.txt'
train_file = 'train.txt'
test_file = 'test.txt'


def test_env_vars():
    assert 'WANDB_API_KEY' in os.environ
    assert 'WANDB_PROJECT' in os.environ
    assert 'WANDB_WATCH' in os.environ
    assert os.environ['WANDB_WATCH'] == 'all'
    assert 'GOOGLE_APPLICATION_CREDENTIALS_JSON' in os.environ


@pytest.fixture(scope='session', autouse=True)
def cleanup():
    yield
    if os.path.exists(test_data_folder):
        shutil.rmtree(test_data_folder)


def test_run():
    luigi.configuration.get_config().set('GlobalConfig', 'data_folder', test_data_folder)
    result = luigi.build([DownloadDataset(bucket=test_bucket, filename=test_filename),
                          PreprocessDataset(eos_token=eos_token, bos_token=bos_token),
                          SplitDataset(),
                          Train(num_train_epochs=1, block_size=64)],
                         local_scheduler=True,
                         detailed_summary=True)

    assert result.status == LuigiStatusCode.SUCCESS or \
           result.status == LuigiStatusCode.SUCCESS_WITH_RETRY


def test_download():
    assert os.path.isfile(os.path.join(test_data_folder, motions_file))  # dataset was not downloaded


def test_preprocess():
    assert os.path.isfile(os.path.join(test_data_folder, motions_prep_file))  # dataset was not preprocessed


def test_split():
    assert os.path.isfile(os.path.join(test_data_folder, train_file))  # train file was not created
    assert os.path.isfile(os.path.join(test_data_folder, test_file))  # test file was not created
