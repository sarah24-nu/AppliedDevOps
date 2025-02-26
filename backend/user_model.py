from pymongo import MongoClient
from pymongo.errors import PyMongoError  # ✅ Added missing import
from config import Config


class UserModel:
    def __init__(self):
        client = MongoClient(Config.MONGODB_URI)
        self.db = client[Config.DB_NAME]
        self.collection = self.db["users"]

    def find_by_email(self, email):
        return self.collection.find_one({"email": email})

    def create_user(self, email, hashed_password, name, security_question, security_answer):
        """Insert a new user into the database."""
        self.collection.insert_one(
            {
                "email": email,
                "password": hashed_password,
                "name": name,
                "securityQuestion": security_question,
                "securityAnswer": security_answer,
            }
        )

    def update_password(self, email, new_password):
        """Update user password securely."""
        try:
            self.collection.update_one(
                {"email": email}, {"$set": {"password": new_password}}
            )
        except PyMongoError as e:
            raise Exception(f"Database error: {str(e)}")
