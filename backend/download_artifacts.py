import os
import json
import zipfile
import logging
from google.cloud import storage
from google.oauth2 import service_account

logging.basicConfig(level=logging.INFO)

project_id = 'motiongenerator'
bucket_name = 'motiongenerator'
model_zip = 'atomic-dawn-43.zip'

service_account_info = json.loads(
        os.environ.get('GOOGLE_APPLICATION_CREDENTIALS_JSON')
)

credentials = service_account.Credentials.from_service_account_info(
        service_account_info
)

client = storage.Client(project=project_id, credentials=credentials)

if __name__ == '__main__':
    bucket = client.get_bucket(bucket_name)
    logging.info("Was successfully authorized.")

    blob = bucket.get_blob(model_zip)
    logging.info("Started downloading file")

    if not os.path.exists('artifacts'):
        logging.info("Created artifacts directory")
        os.makedirs('artifacts')

    blob.download_to_filename(os.path.join('artifacts', model_zip))
    logging.info("Finished downloading file")

    with zipfile.ZipFile(os.path.join('artifacts', model_zip), "r") as zip_ref:
        logging.info("Unzipping archive")
        zip_ref.extractall(os.path.join('artifacts', 'model'))

    os.remove(os.path.join('artifacts', model_zip))
    logging.info("Deleted archive")
