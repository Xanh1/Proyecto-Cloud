from flask import Blueprint, jsonify, make_response, request, send_from_directory
from routes.utils import json_response
from controllers.report_controller import ReportController
from routes.schemas.schema import create_report, chage_status
from flask_expects_json import expects_json


report_url = Blueprint('report_url', __name__)

report_controller = ReportController()

@report_url.route('/report/create', methods=['POST'])
def create():
    try:
        #  Usar request.form y request.files para manejar `multipart/form-data`
        msg, code, context = report_controller.create()
        return make_response(jsonify({'msg': msg, 'code': code, 'context': context}), code)
    except Exception as e:
        return make_response(jsonify({'msg': 'Error interno', 'error': str(e)}), 500)
    
@report_url.route('/report/user/<uid>', methods = ['GET'])
def reports_user(uid):
    
    msg, code, context = report_controller.get_reports_by_user(uid)

    return make_response(jsonify(json_response(msg, code, context)), code)

@report_url.route('/report/view/<uid>', methods = ['GET'])
def view_report(uid):
    
    msg, code, context = report_controller.view_report(uid)

    return make_response(jsonify(json_response(msg, code, context)), code)

@report_url.route('/report/all', methods = ['GET'])
def reports_all():
    
    msg, code, context  = report_controller.get_all()
    
    return make_response(jsonify(json_response(msg, code, context)), code)

@report_url.route('/reports/all/desc', methods = ['GET'])
def reports_desc():
    
    msg, code, context  = report_controller.get_all_desc()
    
    return make_response(jsonify(json_response(msg, code, context)), code)

@report_url.route('/uploads/<filename>', methods=['GET'])
def uploaded_file(filename):
    return send_from_directory('./uploads', filename)


@report_url.route('/report/update', methods=['POST'])
@expects_json(chage_status)
def update_report():
    
    data = request.json
    
    report = data['report']
    status = data['status']
    
    msg, code, context = report_controller.reporte_update(report, status)
    
    return make_response(jsonify(json_response(msg, code, context)), code)