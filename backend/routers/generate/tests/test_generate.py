from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


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
