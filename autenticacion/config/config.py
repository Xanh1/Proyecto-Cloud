from os import environ, path
from dotenv import load_dotenv

base_dir = path.abspath(path.dirname('__file__'))

load_dotenv(path.join(base_dir, 'config/.env'))

class Config:
    
    # config
    FLASK_APP = environ.get('FLASK_APP')
    FLASK_ENV = environ.get('FLASK_ENV')

    # Keys
    SECRET_KEY = environ.get('SECRET_KEY')

    # DB Config
    user = environ.get('MYSQL_USER')
    password = environ.get('MYSQL_PASSWORD')
    host = environ.get('MYSQL_HOST')
    db = environ.get('MYSQL_DATABASE')
    
    # SQLAlchemy Confing
    SQLALCHEMY_DATABASE_URI = f'mysql://{user}:{password}@{host}/{db}'
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_RECORS_QUERIES = True
    SQLALCHEMY_TRACK_MODIFICATIONS = 'enable'