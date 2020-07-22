import os
import shutil
import re
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
test_size=0.1

test_result_folder = 'tests/results_test'
result_files = ['config.json', 'pytorch_model.bin', 'training_args.bin']


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

    if os.path.exists(test_result_folder):
        shutil.rmtree(test_result_folder)


def test_run():
    luigi.configuration.get_config().set('GlobalConfig', 'data_folder', test_data_folder)
    luigi.configuration.get_config().set('GlobalConfig', 'result_folder', test_result_folder)
    result = luigi.build([DownloadDataset(bucket=test_bucket, filename=test_filename),
                          PreprocessDataset(eos_token=eos_token, bos_token=bos_token),
                          SplitDataset(test_size=test_size),
                          Train(num_train_epochs=1, block_size=64)],
                         local_scheduler=True,
                         detailed_summary=True)

    assert result.status == LuigiStatusCode.SUCCESS or \
           result.status == LuigiStatusCode.SUCCESS_WITH_RETRY


def test_download():
    motions_file_path = os.path.join(test_data_folder, motions_file)
    assert os.path.isfile(motions_file_path)  # dataset was not downloaded
    assert os.path.getsize(motions_file_path) > 0


def test_preprocess():
    motion_prep_file_path = os.path.join(test_data_folder, motions_prep_file)
    assert os.path.isfile(motion_prep_file_path)  # dataset was not preprocessed
    assert os.path.getsize(motion_prep_file_path) > 0

    pattern = f"^{re.escape(bos_token)}.*{re.escape(eos_token)}\n$"
    with open(motion_prep_file_path, 'r') as f:
        motions = f.readlines()
        for motion in motions:
            assert re.search(pattern, motion) is not None


def test_split():
    motions_file_path = os.path.join(test_data_folder, motions_file)
    test_file_path = os.path.join(test_data_folder, test_file)
    train_file_path = os.path.join(test_data_folder, train_file)

    assert os.path.isfile(test_file_path)  # train file was not created
    assert os.path.isfile(train_file_path)  # test file was not created
    assert os.path.getsize(test_file_path) > 0
    assert os.path.getsize(train_file_path) > 0

    with open(motions_file_path, 'r') as f:
        num_motions = len(f.readlines())

    num_test_motions = int(num_motions * test_size)
    num_train_motions = num_motions - num_test_motions

    with open(test_file_path, 'r') as f:
        assert len(f.readlines()) == num_test_motions

    with open(train_file_path, 'r') as f:
        assert len(f.readlines()) == num_train_motions

def test_result():
    for f in result_files:
        file_path = os.path.join(test_result_folder, f)
        assert os.path.isfile(file_path)
