from flask import Blueprint, jsonify, request
from pymongo.errors import PyMongoError
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash, generate_password_hash
from user_model import UserModel
from utils.auth_utils import hash_password, verify_password

auth_bp = Blueprint("auth", __name__)
user_model = UserModel()


@auth_bp.route("/signup", methods=["POST"])
def signup():
    """Register a new user."""
    data = request.json
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")
    security_question = data.get("securityQuestion")
    security_answer = data.get("securityAnswer")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    if user_model.find_by_email(email):
        return jsonify({"error": "User already exists"}), 400

    hashed_password = hash_password(password)
    hashed_security_answer = hash_password(security_answer)

    user_model.create_user(
        email, hashed_password, name, security_question, hashed_security_answer
    )
    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.route("/signin", methods=["POST"])
def signin():
    """Authenticate user and return a JWT token."""
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = user_model.find_by_email(email)
    if not user or not verify_password(password, user["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_access_token(identity=str(user["_id"]))
    return jsonify({"token": token, "message": "Login successful"}), 200


@auth_bp.route("/get-security-question", methods=["POST"])
def get_security_question():
    """Retrieve security question for password reset."""
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = user_model.find_by_email(email)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"securityQuestion": user["securityQuestion"]}), 200


@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    """Reset a user's password after verifying security answer."""
    try:
        data = request.json
        email = data.get("email")
        security_answer = data.get("securityAnswer")
        new_password = data.get("newPassword")

        if not email or not security_answer or not new_password:
            return jsonify({"error": "All fields are required"}), 400

        user = user_model.find_by_email(email)
        if not user:
            return jsonify({"error": "User not found"}), 404

        if not check_password_hash(user["securityAnswer"], security_answer):
            return jsonify({"error": "Incorrect security answer"}), 400

        hashed_password = generate_password_hash(new_password)
        user_model.update_password(email, hashed_password)

        return jsonify({"success": True, "message": "Password reset successfully"}), 200

    except PyMongoError as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500
