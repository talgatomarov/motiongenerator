import os
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

model_folder = './artifacts/model'
model_files = ['config.json', 'pytorch_model.bin', 'training_args.bin',
                'special_tokens_map.json', 'merges.txt', 'run_name.txt',
                'tokenizer_config.json', 'vocab.json']



def test_get_predict():
    response = client.get('/api/generate')
    assert response.status_code == 405


def test_post_predict():
    motion = "This house believes that Kazakhstan"

    response = client.post(
        '/api/generate',
        json={"prefix": motion, "temperature": 0.7}
    )

    assert response.status_code == 200
    assert len(response.json()["motions"]) == 5

def test_artifacts():
    for f in model_files:
        file_path = os.path.join(model_folder, f)
        assert os.path.isfile(file_path)

