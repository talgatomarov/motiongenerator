import os
import json
import zipfile
import logging
from google.cloud import storage
from google.oauth2 import service_account

logging.basicConfig(level=logging.INFO)

# Specify project, bucket and file location of the model artifact
artifact_folder = 'artifacts'
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

    if not os.path.exists(artifact_folder):
        logging.info("Created artifacts directory")
        os.makedirs(artifact_folder)

    blob.download_to_filename(os.path.join(artifact_folder, model_zip))
    logging.info("Finished downloading file")

    with zipfile.ZipFile(os.path.join(artifact_folder, model_zip), "r") as zip_ref:
        logging.info("Unzipping archive")
        zip_ref.extractall(os.path.join(artifact_folder, 'model'))

    os.remove(os.path.join(artifact_folder, model_zip))
    logging.info("Deleted archive")
