from flask import jsonify, make_response, current_app, request
import jwt
from functools import wraps
from modelo.person import Person
from .utils.errors import Errors

def token_required(f):
    
    @wraps(f)
    def decored(*args, **kwargs):
        
        token = None

        if 'X-Access-Token' in request.headers:
            token = request.headers['X-Access-Token']

        if not token:
            return make_response(jsonify({
                'msg'  : 'Error',
                'code' : 400,
                'info' : {'error' : Errors.error[str(-14)]},
                }), 400)
        
        
        try:
            
            token_info = jwt.decode(token,
                                    algorithms = "HS512",
                                    verify = True, 
                                    key = current_app.config['SECRET_KEY']
                                    )

            person = Person.query.filter_by(uid = token_info['uid']).first()
            
            if not person:
                return make_response(jsonify({
                    'msg'  : 'Error',
                    'code' : 401,
                    'info' : {'error' : Errors.error[str(-14)]},
                }), 401)
            
        except Exception :    
            return make_response(jsonify({
                    'msg'  : 'Error',
                    'code' : 401,
                    'info' : {'error' : Errors.error[str(-14)]},
                }), 401)
        
        return f(*args, **kwargs)
    
    return decored