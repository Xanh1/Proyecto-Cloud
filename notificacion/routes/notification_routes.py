from flask import Blueprint, request, jsonify
from services.notification_service import create_notification, get_notifications, mark_as_read

notification_blueprint = Blueprint("notifications", __name__)

@notification_blueprint.route("/", methods=["GET"])
def list_notifications():
    user_id = request.args.get("user_id", type=int)
    return jsonify(get_notifications(user_id))

@notification_blueprint.route("/", methods=["POST"])
def create():
    data = request.json
    new_notification = create_notification(data["title"], data["message"], data["user_id"])
    return jsonify(new_notification), 201

@notification_blueprint.route("/<int:notification_id>/read", methods=["PATCH"])
def mark_read(notification_id):
    updated_notification = mark_as_read(notification_id)
    if updated_notification:
        return jsonify(updated_notification)
    return jsonify({"error": "Notification not found"}), 404