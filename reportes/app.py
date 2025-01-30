from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import pymysql
pymysql.install_as_MySQLdb()
from init_table import init

DB = SQLAlchemy()

def create_app():
    app = Flask(__name__, instance_relative_config = False)

    CORS(app)
    
    app.config.from_object('config.config.Config')
    
    DB.init_app(app)
    
    with app.app_context():
        from routes.report_route import report_url
        
        app.register_blueprint(report_url)

        init()
        
        DB.create_all()
    
    return app