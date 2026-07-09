from fastapi.testclient import TestClient

from app.main import app


def test_health():
    with TestClient(app) as client:
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok"}


def test_recommendations_accepts_need():
    with TestClient(app) as client:
        response = client.post("/recommendations", json={"need": "something smoky, not too strong"})
        assert response.status_code == 200
        assert isinstance(response.json(), list)
