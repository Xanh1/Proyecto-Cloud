notifications = []  # Simula una base de datos en memoria.

def create_notification(title, message, user_id):
    notification = {
        "id": len(notifications) + 1,
        "title": title,
        "message": message,
        "user_id": user_id,
        "read": False
    }
    notifications.append(notification)
    return notification

def get_notifications(user_id=None):
    if user_id:
        return [n for n in notifications if n["user_id"] == user_id]
    return notifications

def mark_as_read(notification_id):
    for notification in notifications:
        if notification["id"] == notification_id:
            notification["read"] = True
            return notification
    return None