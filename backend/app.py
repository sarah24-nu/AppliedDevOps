from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from pymongo import MongoClient
from auth_routes import auth_bp
from utils.error_handler import register_error_handlers
from config import Config

app = Flask(__name__)
CORS(app)

# Load configurations
app.config.from_object(Config)

# Initialize JWT
jwt = JWTManager(app)

# MongoDB Setup
client = MongoClient(app.config["MONGODB_URI"])
db = client[app.config["DB_NAME"]]
//mongo

# Register authentication blueprint
app.register_blueprint(auth_bp, url_prefix="/api")

# Register error handlers
register_error_handlers(app)


@app.route("/health")
def health_check():
    return jsonify({"status": "healthy"}), 200


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
