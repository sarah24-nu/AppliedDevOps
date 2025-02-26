import pytest
from flask import Flask
from flask_jwt_extended import JWTManager
from auth_routes import auth_bp
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'app')))

@pytest.fixture
def app():
    app = Flask(__name__)
    app.config['JWT_SECRET_KEY'] = 'test-key'  # Set a test secret key
    app.config['TESTING'] = True  # Enable testing mode
    JWTManager(app) 
    app.register_blueprint(auth_bp)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

# Test signup route
def test_signup_missing_fields(client):
    response = client.post('/signup', json={})
    assert response.status_code == 400
    assert b"Email and password are required" in response.data
