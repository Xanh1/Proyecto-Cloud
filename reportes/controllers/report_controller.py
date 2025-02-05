from models.report import Report, ReportStatus
import uuid
from utils.upload_files import upload_image
from flask import request
from app import DB

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class ReportController:
    def create(self):
        try:
            # 📌 Asegurar que la petición es multipart
            if 'subject' not in request.form or 'user' not in request.form or \
               'description' not in request.form or 'direccion' not in request.form or 'imagen' not in request.files:
                return 'Error', 400, 'Todos los campos son obligatorios'

            # 📌 Obtener datos del formulario
            subject = request.form['subject']
            user_uid = request.form['user']
            description = request.form['description']
            direccion = request.form['direccion']
            imagen = request.files['imagen']  # 📌 Capturar la imagen

            # 📌 Verificar que la imagen es válida
            if imagen.filename == '' or not allowed_file(imagen.filename):
                return 'Error', 400, 'Formato de imagen no permitido'

            # 📌 Obtener la extensión del archivo
            ext = imagen.filename.rsplit('.', 1)[1].lower()  # Extrae la extensión (png, jpg, jpeg)
            filename = f"{str(uuid.uuid4())}.{ext}"  # 📌 Crear un nombre único con la extensión

            # 📌 Leer la imagen en bytes antes de subirla
            image_bytes = imagen.read()

            # 📌 Pasar los bytes a la función de subida
            try:
                path = upload_image(image_bytes, filename)
                if not path:
                    return 'Error', 500, 'Error al subir la imagen'
    
            except Exception as e:
                print(f'Error al subir imagen: {e}')
                return 'Error', 500, 'Error al subir la imagen'

            # 📌 Crear reporte
            report = Report()
            report.uid = str(uuid.uuid4())
            report.subject = subject
            report.user_uid = user_uid
            report.description = description
            report.direccion = direccion
            report.imagen_path = path  # 📌 Guardar la ruta de la imagen en la BD

            # 📌 Guardar en la BD
            DB.session.add(report)
            DB.session.commit()

            context = {
                'msg': 'Reporte creado exitosamente',
                'reporte_uid': report.uid,
                'reporte_status': list(ReportStatus).index(report.status)
            }

            # 📌 Enviar notificación
            
            return 'Ok', 200, context
        except Exception as e:
            print(f'Error al crear el reporte: {e}')
            return 'Error', 500, 'Error al crear el reporte'
   

    def get_reports_by_user(self, uid):
        
        reports = Report.query.filter_by(user_uid=uid).all()

        if not reports:
            return 'Error', 404, 'No se han encontrado reportes'
        
        for report in reports:
            report.status = list(ReportStatus).index(report.status)

        reports_serialized = [r.serialize for r in reports]

        return 'Ok', 200, reports_serialized

    def view_report(self, report):
        
        report = Report.query.filter_by(uid=report).first()

        report.status = list(ReportStatus).index(report.status)
        
        if not report:
            return 'Error', 404, 'El reporte no se ha encontrado'

        report_serialized = report.serialize

        return 'Ok', 200, report_serialized
    
    def get_all(self):

        reports = Report.query.all()
 
        for report in reports:
            report.status = list(ReportStatus).index(report.status)
        reports_serialized = [r.serialize for r in reports]
        
        return 'Ok', 200, reports_serialized

    def get_all_desc(self):

        reports = Report.query.order_by(Report.created_at.desc()).all()

        for report in reports:
            report.status = list(ReportStatus).index(report.status)
        reports_serialized = [r.serialize for r in reports]

        return 'Ok', 200, reports_serialized

    def reporte_update(self, report, status):

        estado = list(ReportStatus)[int(status)]

        report = Report.query.filter_by(uid=report).first()
        
        if not report:
            return 'Error', 404, 'El reporte no se ha encontrado'

        report.status = estado.value

        DB.session.add(report)
        DB.session.commit()

        context = {
            'msg': 'Se ha cambiado el estado del reporte',
            'reporte': report.id
        }

        return 'Ok', 200,context

    
    
    