import os
import luigi
import pytest

from model.main import Train, DownloadDataset, SplitDataset, PreprocessDataset
from luigi.execution_summary import LuigiStatusCode


test_bucket = 'gs://motiongenerator'
test_filename = 'motions_test.txt'


@pytest.fixture
def worker():
    w = luigi.worker.Worker()
    yield w

def test_run():
    result = luigi.build([DownloadDataset(bucket=test_bucket, filename=test_filename)],
                          local_scheduler=True, detailed_summary=True)

    assert result.status == LuigiStatusCode.SUCCESS or result.status == LuigiStatusCode.SUCCESS_WITH_RETRY



def test_download():
    assert os.path.isfile(f'./data/{test_filename}') # dataset was not downloaded







