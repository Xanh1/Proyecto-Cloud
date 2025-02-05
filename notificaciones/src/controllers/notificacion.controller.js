const Notificacion = require('../models/notificacion.model');
const {getIo} = require('../services/socket');
var api_validator = require('../utils/api_validator');

exports.crearNotificacion = async (req, res) => {
    try {
        var { ciudadano_uid, reporte_id, reporte_status, rol, municipal_uid } = req.body;
        api_validator.validarCampos({ ciudadano_uid, reporte_id, reporte_status, rol, municipal_uid });

        let titulo = "Estado de Reporte";

        var notificacion = {
            titulo: titulo,
            mensaje: "",
            estado: reporte_status,
            reporte_id,
            uid: "",
            created_at: new Date()
        }

        
        const getMensaje = (rol, reporte_status, reporte_id) => {
            const mensajes = {
                ciudadano: {
                    "Pendiente": "Su reporte ha sido puesto nuevamente en Pendiente.",
                    "Resuelto": "Su reporte ha sido resuelto. Si necesitas más información, contáctanos.",
                    "Rechazado": "Lamentamos informarte que tu reporte fue rechazado. Por favor, revisa la justificación.",
                    "En Proceso": "Tu reporte está siendo atendido. Te mantendremos informado de cualquier actualización."
                },
                municipal: {
                    "Pendiente": `El reporte ${reporte_id} se encuentra nuevamente pendiente de su revisión.`,
                    "Resuelto": `Has resuelto el reporte ${reporte_id}.`,
                    "Rechazado": `Has rechazado el reporte ${reporte_id}. Asegúrate de registrar la justificación adecuada.`,
                    "En Proceso": `El reporte ${reporte_id} está en proceso.`
                }
            };
            return mensajes[rol]?.[reporte_status] || "Estado del reporte no reconocido.";
        };

        let mensaje  = getMensaje("ciudadano", reporte_status, reporte_id);
        if (mensaje !== "Estado del reporte no reconocido.") {
            notificacion.mensaje = mensaje;
            notificacion.uid = ciudadano_uid;
            await Notificacion.crearNotificacionService(notificacion);
            if(rol === "ciudadano"){
                this.pushNotificacion("notificacion",notificacion);
            }
            
        }

        let mensajeMunicipal = getMensaje("municipal", reporte_status, reporte_id);
        if (mensajeMunicipal !== "Estado del reporte no reconocido.") {
            notificacion.mensaje = mensajeMunicipal;
            notificacion.uid = municipal_uid;
            await Notificacion.crearNotificacionService(notificacion);
            this.pushNotificacion("notificacion_Municipales",notificacion);
        }

        var data = {
            mensaje: mensaje,
            mensajeMunicipal: mensajeMunicipal
        }
        api_validator.successServer(req, res, data, 'Notificaciones enviadas correctamente');
    } catch (error) {
        console.error('Error en la creación de notificaciones:', error.message);
        api_validator.errorServer(req, res, error, 'Error al crear las notificaciones');
    }
};


exports.getNotificacionesByUid = async (req, res) => {
    try {
        const { uid } = req.params;
        const notificaciones = await Notificacion.getNotificacionService(uid);
        api_validator.successServer(req, res, notificaciones, 'Notificaciones obtenidas correctamente');
    } catch (error) {
        console.error('Error obteniendo notificaciones:', error.message);
        api_validator.errorServer(req, res, error, 'Error al obtener las notificaciones');
    }
}

exports.notificarAllMunicipales = async (req, res) => {
    try {
        var data = { reporte_id, user_uid } = req.body;
        api_validator.validarCampos(data);

        let titulo = "Estado de Reporte";
        let mensaje = "Su reporte ha sido creado. Un encargado revisará la información pronto.";

        var notificacion = {
            titulo: titulo,
            mensaje: mensaje,
            estado: "Pendiente",
            reporte_id: data.reporte_id,
            uid: data.user_uid,
            created_at: new Date()
        };

        await Notificacion.crearNotificacionService(notificacion);
        this.pushNotificacion(notificacion);
        console.log("Notificación enviada a usuario", notificacion);

        // Obtener los municipales
        const municipales = await Notificacion.getAllMunicipalesService();
        console.log("Municipales", municipales);

        // Usamos for...of en lugar de forEach para manejar async/await correctamente
        for (const municipal of municipales) {
            const notificacionMunicipal = {
                titulo: titulo,
                mensaje: `Se ha generado un nuevo reporte y está pendiente de su revisión. Reporte - ${data.reporte_id}`,
                estado: "Pendiente",
                reporte_id: data.reporte_id,
                uid: municipal.uid,
                created_at: new Date()
            };

            var sql = await Notificacion.crearNotificacionService(notificacionMunicipal);
            console.log("Log SQL", sql);
        }

        console.log("Notificaciones enviadas a municipales");
        api_validator.successServer(req, res, municipales, 'Notificaciones enviadas correctamente');
    } catch (error) {
        console.error('Error en la creación de notificaciones:', error.message);
        api_validator.errorServer(req, res, error, 'Error al crear las notificaciones');
    }
};


exports.pushNotificacion = (name,data) => {
    const io = getIo();
    io.emit(name, data);
}



