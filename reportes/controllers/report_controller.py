from models.report import Report, ReportStatus

from app import DB

class ReportController:

    def create(self, data):

        report = Report()
        
        report.subject = data['subject']
        report.user_id = data['user']
        report.description = data['description']

        DB.session.add(report)
        DB.session.commit()

        return 'Ok', 'Reporte creado satisfactorio', 201

    def get_reports_by_user(self, user):
        
        reports = Report.query.filter_by(user_id=user).all()
        
        reports_serialized = [r.serialize for r in reports]
        
        return 'Ok', 200, reports_serialized
    
    def get_all(self):

        reports = Report.query.all()

        reports_serialized = [r.serialize for r in reports]
        
        return 'Ok', 200, reports_serialized
    
    def start_report(self, report):

        report = Report.query.filter_by(uid=report).first()

        if not report:
            return 'Error', 'El reporte no se ha encontrado', 404

        report.status =  ReportStatus.IN_PROGRESS

        DB.session.add(report)
        DB.session.commit()

        return 'Ok', 'El reporte se ha iniciado correctamente', 200
    
    def report_cancel(self, report):

        report = Report.query.filter_by(uid=report).first()

        if not report:
            return 'Error', 'El reporte no se ha encontrado', 404

        report.status =  ReportStatus.CLOSED

        DB.session.add(report)
        DB.session.commit()

        return 'Ok', 'El reporte se ha rechazado correctamente', 200

    def report_finish(self, report):

        report = Report.query.filter_by(uid=report).first()

        if not report:
            return 'Error', 'El reporte no se ha encontrado', 404

        report.status =  ReportStatus.RESOLVED

        DB.session.add(report)
        DB.session.commit()

        return 'Ok', 'El reporte se ha finalizado correctamente', 200

    
    