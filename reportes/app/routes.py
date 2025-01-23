from flask import Blueprint, request, jsonify
from app.models import db, Incident

incident_blueprint = Blueprint('incident_blueprint', __name__)

# Crear un reporte
@incident_blueprint.route('/incidents', methods=['POST'])
def create_incident():
    data = request.get_json()
    new_incident = Incident(name=data['name'], user_id=data['user_id'])
    db.session.add(new_incident)
    db.session.commit()
    return jsonify({"message": "Incident created successfully!"}), 201

# Obtener todos los reportes
@incident_blueprint.route('/incidents', methods=['GET'])
def get_incidents():
    incidents = Incident.query.all()
    results = [{"id": inc.id, "name": inc.name, "user_id": inc.user_id} for inc in incidents]
    return jsonify(results), 200

# Obtener un reporte por ID
@incident_blueprint.route('/incidents/<int:id>', methods=['GET'])
def get_incident(id):
    incident = Incident.query.get(id)
    if incident:
        return jsonify({"id": incident.id, "name": incident.name, "user_id": incident.user_id}), 200
    return jsonify({"message": "Incident not found"}), 404

# Actualizar un reporte
@incident_blueprint.route('/incidents/<int:id>', methods=['PUT'])
def update_incident(id):
    incident = Incident.query.get(id)
    if not incident:
        return jsonify({"message": "Incident not found"}), 404

    data = request.get_json()
    incident.name = data.get('name', incident.name)
    incident.user_id = data.get('user_id', incident.user_id)
    db.session.commit()
    return jsonify({"message": "Incident updated successfully!"}), 200

# Eliminar un reporte
@incident_blueprint.route('/incidents/<int:id>', methods=['DELETE'])
def delete_incident(id):
    incident = Incident.query.get(id)
    if not incident:
        return jsonify({"message": "Incident not found"}), 404

    db.session.delete(incident)
    db.session.commit()
    return jsonify({"message": "Incident deleted successfully!"}), 200