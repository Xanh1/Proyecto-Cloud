import uuid
from datetime import datetime
from enum import Enum

from app import DB

class ReportStatus(Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    CLOSED = "closed"

class Report(DB.Model):
    
    # table name
    __tablename__ = 'reports'
    
    # fields
    id          = DB.Column(DB.Integer, primary_key=True)
    uid         = DB.Column(DB.String(60), default=str(uuid.uuid4()), nullable=False)
    subject     = DB.Column(DB.String(255), nullable=False)
    description = DB.Column(DB.Text, nullable=False)
    status      = DB.Column(DB.Enum(ReportStatus), nullable=False, default=ReportStatus.PENDING)
    user_id     = DB.Column(DB.Integer, nullable=False)
    
    # audit fields
    created_at = DB.Column(DB.DateTime, default=datetime.now)
    updated_at = DB.Column(DB.DateTime, default=datetime.now, onupdate=datetime.now)
    
    # methods
    @property
    def serialize(self):
        return {
            'uid': self.uid,
            'subject': self.subject,
            'description': self.description,
            'status': self.status.value,
        }
