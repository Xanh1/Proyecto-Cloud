from models.report import Report

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
    
    