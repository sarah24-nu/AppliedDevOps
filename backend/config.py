import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb+srv://f219410:muhiman72724@newcluster.ellg2b1.mongodb.net/')
    DB_NAME = os.getenv('DB_NAME', 'auth_database')  # Renamed for clarity
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your_secret_key')
