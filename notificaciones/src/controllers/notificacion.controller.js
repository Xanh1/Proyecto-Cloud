const Notificacion = require('../models/notificacion.model');
const {getIo} = require('../services/socket');
var api_validator = require('../utils/api_validator');

exports.crearNotificacion = async (req, res) => {
    try {
        var data = {titulo, mensaje, estado, reporte_id } = req.body; 
        api_validator.validarCampos(data);
        if (estado !== "Pendiente") {
           data.titulo = "Se ha actualizado el reporte " + reporte_id + " a " + estado;
           data.mensaje = "Revisa los detalles para más información " + reporte_id;
        } else {
           data.titulo = "Se ha generado un nuevo reporte";
           data.mensaje = "Revisa los detalles para más información " + reporte_id;
        }
        const notificacion = await Notificacion.crearNotificacionService(data);
        this.pushNotificacion(data);
        api_validator.successServer(req, res, notificacion, 'Notificacion creada correctamente');
        
    } catch (error) {
        api_validator.errorServer(req, res, 500, error);
    }
  };

exports.getAllNotificaciones = async (req, res) => {
    try {
        const notificaciones = await Notificacion.getAllNotificacionesService();
        api_validator.successServer(req, res, notificaciones, 'Notificaciones encontradas correctamente');
    } catch (error) {
        api_validator.errorServer(req, res, 500,error);
    }
};

exports.getNotificacionById = async (req, res) => {
    try {
        const _id = req.params.id;
        const notificacion = await Notificacion.getNotificacionService(_id);
        if (!notificacion) {
            return api_validator.errorServer(req, res, 505 , 'Notificacion no encontrada');
        }
        api_validator.successServer(req, res, notificacion, 'Notificacion encontrada correctamente');

    } catch (error) {
        return api_validator.errorServer(req, res, 505, error ?? 'Notificacion no encontrada');
    }
}

exports.deleteNotificacion = async (req, res) => {
    try {
        const _id = req.params.id;
        const notificacion = await Notificacion.eliminarNotificacionService(_id);
        if (!notificacion) {
            return api_validator.errorServer(req, res, 505 , 'Notificacion no encontrada');
        }
        api_validator.successServer(req, res, notificacion, 'Notificacion eliminada correctamente');

    } catch (error) {
        return api_validator.errorServer(req, res, 505, error ?? 'Notificacion no encontrada');
    }
}

exports.pushNotificacion = (data) => {
    const io = getIo();
    io.emit('notificacion', data);
}

