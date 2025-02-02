from models.report import Report, ReportStatus
import uuid
from app import DB

class ReportController:

    def create(self, data):

        report = Report()
        
        report.uid = str(uuid.uuid4())
        report.subject = data['subject']
        report.user_uid = data['user']
        report.description = data['description']

        DB.session.add(report)
        DB.session.commit()

        context = {
            'msg': 'Reporte creado satisfactorio',
            'reporte': report.id
        }

        return 'Ok', 201, context

    def get_reports_by_user(self, user):
        
        reports = Report.query.filter_by(user_uid=user).all()
        
        reports_serialized = [{"id": r.id, **r.serialize} for r in reports]
        
        return 'Ok', 200, reports_serialized
    
    def get_all(self):

        reports = Report.query.all()

        reports_serialized = [r.serialize for r in reports]
        
        return 'Ok', 200, reports_serialized
    
    def start_report(self, report):

        report = Report.query.filter_by(uid=report).first()

        if not report:
            return 'Error', 404, 'El reporte no se ha encontrado'

        report.status =  ReportStatus.IN_PROGRESS

        DB.session.add(report)
        DB.session.commit()

        context = {
            'msg': 'Se ha cambiado el estado del reporte a IN_PROGRESS',
            'reporte': report.id
        }

        return 'Ok', 200,context
    
    def report_cancel(self, report):

        report = Report.query.filter_by(uid=report).first()

        if not report:
            return 'Error', 'El reporte no se ha encontrado', 404

        report.status =  ReportStatus.CLOSED

        DB.session.add(report)
        DB.session.commit()

        context = {
            'msg': 'Se ha cambiado el estado del reporte a CLOSED',
            'reporte': report.id
        }

        return 'Ok', 200,context

    def report_finish(self, report):

        report = Report.query.filter_by(uid=report).first()

        if not report:
            return 'Error', 404, 'El reporte no se ha encontrado'

        report.status =  ReportStatus.RESOLVED

        DB.session.add(report)
        DB.session.commit()

        context = {
            'msg': 'Se ha cambiado el estado del reporte a Finalizado',
            'reporte': report.id
        }

        return 'Ok', 200,context
    
    