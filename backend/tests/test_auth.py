import pytest
from flask import Flask
from flask_jwt_extended import JWTManager
from auth_routes import auth_bp


@pytest.fixture
def app():
    """Fixture to create a Flask test app."""
    app = Flask(__name__)
    app.config["JWT_SECRET_KEY"] = "test-key"
    app.config["TESTING"] = True
    JWTManager(app)
    app.register_blueprint(auth_bp)
    return app


@pytest.fixture
def client(app):
    """Fixture to create a test client."""
    return app.test_client()


def test_signup_missing_fields(client):
    """Test signup with missing fields."""
    response = client.post("/signup", json={})
    assert response.status_code == 400
    assert b"Email and password are required" in response.data
