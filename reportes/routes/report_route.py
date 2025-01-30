from flask import Blueprint, jsonify, make_response, request
from routes.utils import json_response
from controllers.report_controller import ReportController
from routes.schemas.schema import create_report
from flask_expects_json import expects_json


report_url = Blueprint('report_url', __name__)

report_controller = ReportController()

@report_url.route('/create', methods = ['POST'])
@expects_json(create_report)
def create():

    json = request.json
    
    msg, context, code = report_controller.create(data = json)

    return make_response(jsonify({'msg': msg, 'code': code, 'context': context}), 200)

@report_url.route('/report/all/<uid>', methods = ['GET'])
def notification_all(uid):
    
    json = request.json
    
    msg, code, context  = report_controller.get_reports_by_user(uid)
    
    return make_response(jsonify(json_response(msg, code, context)), code)