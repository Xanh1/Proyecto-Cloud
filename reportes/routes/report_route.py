from flask import Blueprint, jsonify, make_response, request
from routes.utils import json_response
from controllers.report_controller import ReportController
from routes.schemas.schema import create_report, chage_status
from flask_expects_json import expects_json


report_url = Blueprint('report_url', __name__)

report_controller = ReportController()

@report_url.route('/create', methods = ['POST'])
@expects_json(create_report)
def create():

    json = request.json
    
    msg, context, code = report_controller.create(data = json)

    return make_response(jsonify({'msg': msg, 'code': code, 'context': context}), code)

@report_url.route('/report/all/<uid>', methods = ['GET'])
def reports_by_user(uid):
    
    json = request.json
    
    msg, code, context  = report_controller.get_reports_by_user(uid)
    
    return make_response(jsonify(json_response(msg, code, context)), code)

@report_url.route('/report/all', methods = ['GET'])
def reports_all():
    
    msg, code, context  = report_controller.get_all()
    
    return make_response(jsonify(json_response(msg, code, context)), code)

@report_url.route('/report/start', methods = ['POST'])
@expects_json(chage_status)
def start_status_report():

    report = request.json['report']
    
    msg, context, code = report_controller.start_report(report)

    return make_response(jsonify({'msg': msg, 'code': code, 'context': context}), code)

@report_url.route('/report/cancel', methods = ['POST'])
@expects_json(chage_status)
def cancel_status_report():

    report = request.json['report']
    
    msg, context, code = report_controller.report_cancel(report)

    return make_response(jsonify({'msg': msg, 'code': code, 'context': context}), code)

@report_url.route('/report/finish', methods = ['POST'])
@expects_json(chage_status)
def finsih_status_report():

    report = request.json['report']
    
    msg, context, code = report_controller.report_finish(report)

    return make_response(jsonify({'msg': msg, 'code': code, 'context': context}), code)