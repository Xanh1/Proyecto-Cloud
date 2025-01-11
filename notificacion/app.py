from flask import Flask
from flask_cors import CORS
from routes.notification_routes import notification_blueprint

app = Flask(__name__)
CORS(app)  # Habilita CORS para permitir solicitudes desde otros dominios.

# Registrar el blueprint de notificaciones.
app.register_blueprint(notification_blueprint, url_prefix="/notifications")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)