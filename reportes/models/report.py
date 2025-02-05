import uuid
from datetime import datetime
from enum import Enum
from app import DB

class ReportStatus(Enum):
    PENDIENTE = "Pendiente"
    PROCESO = "Proceso"
    RESUELTO = "Resuelto"
    RECHAZADO = "Rechazado"

class Report(DB.Model):
    
    # table name
    __tablename__ = 'reports'
    
    # fields
    id          = DB.Column(DB.Integer, primary_key=True)
    uid         = DB.Column(DB.String(60), default=str(uuid.uuid4()), nullable=False)
    subject     = DB.Column(DB.String(255), nullable=False)
    description = DB.Column(DB.Text, nullable=False)
    direccion   = DB.Column(DB.String(255), nullable=False)
    imagen_path = DB.Column(DB.String(255), nullable=False)
    status      = DB.Column(DB.Enum(ReportStatus), nullable=False, default=ReportStatus.PENDIENTE)
    user_uid    = DB.Column(DB.String(60), nullable=False)
    
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
            'direccion': self.direccion,
            'status': self.status,
            'imagen_path': self.imagen_path,
            'created_at': self.created_at,
            'user_uid': self.user_uid
        }
