import pytest
from flask import Flask
from unittest.mock import patch, MagicMock
from auth_routes import auth_bp
from flask_jwt_extended import create_access_token


@pytest.fixture
def client():
    """Set up Flask test client."""
    app = Flask(__name__)
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.config["TESTING"] = True
    app.config["JWT_SECRET_KEY"] = "test_secret"
    return app.test_client()


@patch("auth_routes.user_model")
def test_signup_success(mock_user_model, client):
    """Test successful user signup."""
    mock_user_model.find_by_email.return_value = None
    mock_user_model.create_user.return_value = None

    response = client.post(
        "/api/signup",
        json={
            "email": "test@example.com",
            "password": "securepassword",
            "name": "Test User",
            "securityQuestion": "Your pet's name?",
            "securityAnswer": "Fluffy",
        },
    )

    assert response.status_code == 201
    assert response.json["message"] == "User registered successfully"


@patch("auth_routes.user_model")
def test_signup_existing_user(mock_user_model, client):
    """Test signup failure if user already exists."""
    mock_user_model.find_by_email.return_value = {"email": "test@example.com"}

    response = client.post(
        "/api/signup",
        json={
            "email": "test@example.com",
            "password": "securepassword",
            "name": "Test User",
            "securityQuestion": "Your pet's name?",
            "securityAnswer": "Fluffy",
        },
    )

    assert response.status_code == 400
    assert response.json["error"] == "User already exists"


def test_signup_missing_fields(client):
    """Test signup failure when required fields are missing."""
    response = client.post("/api/signup", json={"email": "test@example.com"})
    assert response.status_code == 400
    assert "error" in response.json


@patch("auth_routes.user_model")
@patch("auth_routes.verify_password")
def test_signin_success(mock_verify_password, mock_user_model, client):
    """Test successful user login."""
    mock_user_model.find_by_email.return_value = {
        "_id": "user123",
        "email": "test@example.com",
        "password": "hashedpassword",
    }
    mock_verify_password.return_value = True

    response = client.post(
        "/api/signin", json={"email": "test@example.com", "password": "securepassword"}
    )

    assert response.status_code == 200
    assert "token" in response.json


@patch("auth_routes.user_model")
@patch("auth_routes.verify_password")
def test_signin_invalid_password(mock_verify_password, mock_user_model, client):
    """Test login failure due to incorrect password."""
    mock_user_model.find_by_email.return_value = {
        "email": "test@example.com",
        "password": "hashedpassword",
    }
    mock_verify_password.return_value = False

    response = client.post(
        "/api/signin", json={"email": "test@example.com", "password": "wrongpassword"}
    )

    assert response.status_code == 401
    assert response.json["error"] == "Invalid email or password"


def test_signin_missing_fields(client):
    """Test login failure when required fields are missing."""
    response = client.post("/api/signin", json={"email": "test@example.com"})
    assert response.status_code == 400
    assert "error" in response.json


@patch("auth_routes.user_model")
def test_get_security_question_success(mock_user_model, client):
    """Test retrieving security question."""
    mock_user_model.find_by_email.return_value = {
        "email": "test@example.com",
        "securityQuestion": "Your pet's name?",
    }

    response = client.post(
        "/api/get-security-question", json={"email": "test@example.com"}
    )

    assert response.status_code == 200
    assert response.json["securityQuestion"] == "Your pet's name?"


@patch("auth_routes.user_model")
def test_get_security_question_user_not_found(mock_user_model, client):
    """Test security question retrieval failure when user does not exist."""
    mock_user_model.find_by_email.return_value = None

    response = client.post(
        "/api/get-security-question", json={"email": "test@example.com"}
    )

    assert response.status_code == 404
    assert response.json["error"] == "User not found"


@patch("auth_routes.user_model")
@patch("auth_routes.check_password_hash")
def test_reset_password_success(mock_check_password_hash, mock_user_model, client):
    """Test successful password reset."""
    mock_user_model.find_by_email.return_value = {
        "email": "test@example.com",
        "securityAnswer": "hashedanswer",
    }
    mock_check_password_hash.return_value = True

    response = client.post(
        "/api/reset-password",
        json={
            "email": "test@example.com",
            "securityAnswer": "Fluffy",
            "newPassword": "newsecurepassword",
        },
    )

    assert response.status_code == 200
    assert response.json["message"] == "Password reset successfully"


@patch("auth_routes.user_model")
@patch("auth_routes.check_password_hash")
def test_reset_password_invalid_answer(
    mock_check_password_hash, mock_user_model, client
):
    """Test password reset failure due to incorrect security answer."""
    mock_user_model.find_by_email.return_value = {
        "email": "test@example.com",
        "securityAnswer": "hashedanswer",
    }
    mock_check_password_hash.return_value = False

    response = client.post(
        "/api/reset-password",
        json={
            "email": "test@example.com",
            "securityAnswer": "WrongAnswer",
            "newPassword": "newsecurepassword",
        },
    )

    assert response.status_code == 400
    assert response.json["error"] == "Incorrect security answer"


@patch("auth_routes.user_model")
def test_reset_password_user_not_found(mock_user_model, client):
    """Test password reset failure when user does not exist."""
    mock_user_model.find_by_email.return_value = None

    response = client.post(
        "/api/reset-password",
        json={
            "email": "test@example.com",
            "securityAnswer": "Fluffy",
            "newPassword": "newsecurepassword",
        },
    )

    assert response.status_code == 404
    assert response.json["error"] == "User not found"
