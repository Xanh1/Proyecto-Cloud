from modelo.person import Person
import uuid
from app import Base
import jwt
from datetime import datetime, timedelta
from flask import current_app
from .utils.errors import Errors
import re
from flask import Blueprint, jsonify, make_response, request

class PersonaControl():

    def list(self):
        return Person.query.all()
    
    def savePerson(self, data):
        correo = Person.query.filter_by(email = data['email']).first()
        dni = Person.query.filter_by(dni = data['dni']).first()

        if correo:
            return -1
        
        elif dni:
            return -2
        
        elif len(data['dni']) > 10:
          return -4
        
        elif not re.match(r'^[a-zA-Z0-9._%+-]+@(unl\.edu\.ec|gmail\.com)$', data['email']):
            return -3 
        
        else:
            
            persona = Person()
            persona.uid = str(uuid.uuid4())
            persona.name = data['name'] 
            if (data['rol'] == 'municipal'):
                persona.rol = 'municipal'
            elif (data['rol'] == 'ciudadano'):
                persona.rol = 'ciudadano'
            else:
                return -16
            persona.dni = data['dni']
            persona.last_name = data['last_name']
            persona.email = data['email']
            persona.password = data['password']
            persona.status = True

            Base.session.add(persona)
            Base.session.commit()
            
            return persona.id   


    def modifyPerson(self, data):
        uid = data['external']
        tem_persona = Person.query.filter_by(uid=uid).first()
        if tem_persona:
            if tem_persona.password == data['old_password']:
                persona = Person()
                persona = tem_persona.copy()
                persona.uid = uuid.uuid4()
                persona.name = data['name']
                persona.last_name = data['last_name']
                persona.email = data['email'] 
                persona.password = data['password']  
                Base.session.merge(persona)
                Base.session.commit()
                return persona.id
            else:
                return -5
        else:
            return -6
        
    def modifyPersonalEmail(self, data):
        persona = Person.query.filter_by(uid=data['external']).first()
        if persona:
            correo = Person.query.filter_by(email = data['email']).first()
            if correo:
                return -1
            else:
                temp_persona = persona.copy()
                temp_persona.uid = uuid.uuid4()
                temp_persona.email = data['email'] 
                temp_persona.password = data['password']  
                Base.session.merge(temp_persona)
                Base.session.commit()
                return temp_persona.id
        else:
            return -6
        
    def searchPersonByDni(self, dni):
        persona = Person.query.filter_by(dni=dni).first()
        if persona:
            info = {
                "name": persona.name,
                "email": persona.email,
                "dni": persona.dni,
                "last_name": persona.last_name
            }
            return info
        else:
            return -6
        
    def searchPersonByUid(self, uid):
        persona = Person.query.filter_by(uid=uid).first()
        if persona:
            info = {
                "name": persona.name,
                "email": persona.email,
                "dni": persona.dni,
                "last_name": persona.last_name
            }
            return info
        else:
            return -6  
        
    def changeStatePerson(self, data):
        persona = Person.query.filter_by(uid=data['external']).first()
        if persona:
            try:
                persona.uid = uuid.uuid4()
                if persona.status:
                    persona.status = False
                    id = 1
                else:
                    persona.status = True
                    id = 2
                Base.session.merge(persona)
                Base.session.commit()
                return id
            except:
                return -6
        else:
            return -6
        
    
    def loginAppWeb(self, values):
        person = Person.query.filter_by(email=values['email']).first()

        if not person:
            return jsonify({"msg": "ERROR", "code": 400, "datos": {"error": Errors.error[str(-11)]}}), 400

        if person.password != values['password']:
            return jsonify({"msg": "ERROR", "code": 400, "datos": {"error": Errors.error[str(-11)]}}), 400

       # if person.rol != 'municipal':
        #    return jsonify({"msg": "ERROR", "code": 400, "datos": {"error": Errors.error[str(-15)]}}), 400

        token = jwt.encode(
            {
                'uid': person.uid,
                'exp': datetime.utcnow() + timedelta(minutes=20)
            },
            key=current_app.config['SECRET_KEY'],
            algorithm='HS512',
        )

        # Respuesta exitosa
        response_data = {
            'token': token,
            'code': 200,
            'person': person.name + " " + person.last_name,
            'necesary': person.uid,
            'id_person' : person.id,
            'uid': person.uid,
            'rol' : person.rol,
        }
        return jsonify(response_data), 200


    def login_app_movil(self, values):
        person = Person.query.filter_by(email=values['email']).first()

        if not person:
            return jsonify({"msg": "ERROR", "code": 400, "datos": {"error": Errors.error[str(-11)]}}), 400

        if person.password != values['password']:
            return jsonify({"msg": "ERROR", "code": 400, "datos": {"error": Errors.error[str(-11)]}}), 400

        if person.rol == 'municipal':
            return jsonify({"msg": "ERROR", "code": 400, "datos": {"error": Errors.error[str(-17)]}}), 400

        token = jwt.encode(
            {
                'uid': person.uid,
                'exp': datetime.utcnow() + timedelta(minutes=20)
            },
            key=current_app.config['SECRET_KEY'],
            algorithm='HS512',
        )

        # Respuesta exitosa
        response_data = {
            'token': token,
            'code': 200,
            'person': person.name + " " + person.last_name,
            'necesary': person.uid
        }
        
        return jsonify(response_data), 200

    def getMunicipales(self):
        personas = Person.query.filter_by(rol='municipal').all()

        personas_serialized = [r.serialize for r in personas]

        if not personas:
            return -7
        else:
            return personas_serialized