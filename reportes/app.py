from flask import Flask
from app.models import db
from app.routes import incident_blueprint

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///incidents.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Registrar rutas
app.register_blueprint(incident_blueprint)

if __name__ == '__main__':
    app.run(debug=True)