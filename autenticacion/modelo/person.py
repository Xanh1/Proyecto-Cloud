import uuid
from datetime import datetime

from app import Base
class Person(Base.Model):

    # table name
    __tablename__ = 'person'

    # fields
    id        = Base.Column(Base.Integer, primary_key = True)
    uid       = Base.Column(Base.String(60), default = str(uuid.uuid4()), nullable = False)
    name      = Base.Column(Base.String(50), nullable = False)
    dni       = Base.Column(Base.String(10), nullable = False, unique = True)
    last_name = Base.Column(Base.String(50), nullable = False)
    email     = Base.Column(Base.String(250), nullable = False, unique = True)
    password  = Base.Column(Base.String(162), nullable = False)
    status    = Base.Column(Base.Boolean, nullable = False)
    
    # audit fields
    created_at = Base.Column(Base.DateTime, default = datetime.now)
    updated_at = Base.Column(Base.DateTime, default = datetime.now, onupdate = datetime.now)
    
    # methods
    @property
    def serialize(self):
        return {
            'uid'       : self.uid,
            'dni'       : self.dni,
            'name'      : self.name,
            'created_at' : self.created_at,
            'last_name' : self.last_name,
            'email'     : self.email,
            'status'    : self.status,
        }
    
    def copy(self):
        copy_person = Person(
            id        = self.id,
            uid       = self.uid,
            name      = self.name,
            dni       = self.dni,
            last_name = self.last_name,
            created_at = self.created_at,
            email     = self.email,
            password  = self.password,
            status    = self.status,
        )
    
        return copy_person