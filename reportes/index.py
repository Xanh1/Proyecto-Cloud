from app import create_app
from flask_cors import CORS
from jsonschema import ValidationError
from flask import jsonify, make_response, request
from werkzeug.middleware.proxy_fix import ProxyFix

app = create_app()

app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

CORS(app, supports_credentials=True)

@app.after_request
def after_request_func(response):
    origin = request.headers.get('Origin')
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, x-csrf-token, Accept, X-Access-Token')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        if origin:
            response.headers.add('Access-Control-Allow-Origin', origin)
    else:
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        if origin:
            response.headers['Access-Control-Allow-Origin'] = origin
    return response


@app.errorhandler(400)
def bad_request(error):
    if isinstance(error.description, ValidationError):
        return make_response(
            jsonify({"msg": "Error", "code": 400, "datos": {str(error.description.message): "error"}}),
            400
        )

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)