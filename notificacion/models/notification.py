class Notification:
    def __init__(self, title, message, user_id, read=False):
        self.title = title
        self.message = message
        self.user_id = user_id
        self.read = read