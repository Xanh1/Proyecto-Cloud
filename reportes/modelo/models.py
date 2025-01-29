from database import db

class Reporte(db.Model):
    __tablename__ = 'reportes'

    id = db.Column(db.Integer, primary_key=True)  # ID único
    usuario = db.Column(db.String(100), nullable=False)  # Usuario que crea el reporte
    estado = db.Column(db.String(50), default='pendiente', nullable=False)  # Estado inicial
    descripcion = db.Column(db.String(255), nullable=False)  # Descripción del reporte

    def to_dict(self):
        return {
            'id': self.id,
            'usuario': self.usuario,
            'estado': self.estado,
            'descripcion': self.descripcion
        }