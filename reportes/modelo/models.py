from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Incident(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)

    def __init__(self, name, user_id):
        self.name = name
        self.user_id = user_id