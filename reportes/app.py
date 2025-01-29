from flask import Flask, request, jsonify
from database import init_db, db
from models import Reporte
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///reportes.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar base de datos
init_db(app)

@app.route('/reportes', methods=['POST'])
def crear_reporte():
    data = request.json
    usuario = data.get('usuario')
    estado = data.get('estado', 'pendiente')
    descripcion = data.get('descripcion')

    if not usuario or not descripcion:
        return jsonify({'error': 'Usuario y descripción son obligatorios'}), 400

    if estado not in ['pendiente', 'en progreso', 'completado']:
        return jsonify({'error': 'Estado inválido'}), 400

    nuevo_reporte = Reporte(usuario=usuario, estado=estado, descripcion=descripcion)
    db.session.add(nuevo_reporte)
    db.session.commit()

    return jsonify(nuevo_reporte.to_dict()), 201


@app.route('/reportes', methods=['GET'])
def obtener_reportes():
    reportes = Reporte.query.all()
    return jsonify([reporte.to_dict() for reporte in reportes]), 200


@app.route('/reportes/<int:id>', methods=['GET'])
def obtener_reporte(id):
    reporte = Reporte.query.get(id)
    if not reporte:
        return jsonify({'error': 'Reporte no encontrado'}), 404
    return jsonify(reporte.to_dict()), 200


@app.route('/reportes/<int:id>', methods=['PUT'])
def actualizar_reporte(id):
    reporte = Reporte.query.get(id)
    if not reporte:
        return jsonify({'error': 'Reporte no encontrado'}), 404

    data = request.json
    reporte.usuario = data.get('usuario', reporte.usuario)
    reporte.estado = data.get('estado', reporte.estado)
    reporte.descripcion = data.get('descripcion', reporte.descripcion)

    db.session.commit()
    return jsonify(reporte.to_dict()), 200


@app.route('/reportes/<int:id>', methods=['DELETE'])
def eliminar_reporte(id):
    reporte = Reporte.query.get(id)
    if not reporte:
        return jsonify({'error': 'Reporte no encontrado'}), 404

    db.session.delete(reporte)
    db.session.commit()
    return jsonify({'message': 'Reporte eliminado'}), 200


if __name__ == '__main__':
    app.run(debug=True)
