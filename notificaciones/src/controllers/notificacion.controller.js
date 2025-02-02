const Notificacion = require('../models/notificacion.model');
const {getIo} = require('../services/socket');
var api_validator = require('../utils/api_validator');

const axios = require('axios');  // Usamos axios para hacer peticiones HTTP
const pool = require('../config/database/db');  // ✅ Importar la conexión a la BD


exports.crearNotificacion = async (req, res) => {
    try {
        const data = req.body;  // Datos enviados para crear el reporte

        // Mostrar los datos que se están enviando a Flask
        console.log('Datos que se están enviando a Flask:', data);

        // Paso 1: Llamar al servicio de reportes en Flask para crear el reporte
        const response = await axios.post('http://127.0.0.1:5001/create', data);
        console.log('Respuesta de Flask:', response.data);

        // Verificar si la respuesta contiene el report_id
        const report_id = response.data.context?.reporte;
        if (!report_id) {
            throw new Error('No se obtuvo un report_id de Flask');
        }

        // Paso 2: Crear la notificación para el usuario que creó el reporte
        const notificacionDataUsuario = {
            titulo: "Nuevo reporte creado",
            mensaje: `Revisa los detalles del reporte ${report_id}`,
            usuario_id: data.user,  // ID del usuario que creó el reporte (mismo que en Flask)
            reporte_id: report_id,   // El mismo report_id recibido de Flask
            estado: data.estado
        };

        // Crear la notificación para el usuario que creó el reporte
        await Notificacion.crearNotificacionService(notificacionDataUsuario);

        // Paso 3: Crear la notificación para los municipales (si no es necesario buscar, podemos omitir la consulta)
        // Si no necesitas buscar los municipales, crea la notificación generica
        const notificacionDataMunicipales = {
            titulo: "Nuevo reporte creado",
            mensaje: `Un nuevo reporte ha sido creado. Revisa los detalles: ${report_id}`,
            reporte_id: report_id,
            estado: data.estado  // Usar el estado de la notificación
        };

        // Crear la notificación para los municipales (si se deben notificar de alguna manera)
        await Notificacion.crearNotificacionService(notificacionDataMunicipales);

        // Respuesta de éxito
        api_validator.successServer(req, res, null, 'Notificaciones creadas correctamente');
    } catch (error) {
        console.error('Error en la solicitud o en la creación de notificaciones:', error);
        api_validator.errorServer(req, res, error, 'Error al crear las notificaciones');
    }
};

exports.startReporte = async (req, res) => {
    try {
        const { report_uuid } = req.body;  // Recibimos el UUID del reporte

        // Verificamos si el UUID está presente
        if (!report_uuid) {
            return res.status(400).json({ msg: 'El UUID del reporte es obligatorio' });
        }

        // Paso 1: Llamar a la API de Flask para actualizar el estado a IN_PROGRESS
        const response = await axios.post('http://127.0.0.1:5001/report/start', { report: report_uuid });

        // Verificar si la respuesta de Flask es correcta
        if (response.status === 200) {
            console.log('Respuesta de Flask:', response.data);

            // Aquí accedemos a 'reporte' en lugar de 'context' para obtener el report_id
            const report_id = response.data.context?.reporte;  // `reporte` contiene el `report_id`

            if (!report_id || isNaN(report_id)) {
                throw new Error('No se recibió un report_id válido desde Flask');
            }

            // Paso 2: Crear la notificación después de cambiar el estado del reporte
            const notificacionData = {
                titulo: 'El reporte ha comenzado',
                mensaje: `El reporte con ID ${report_uuid} ha cambiado su estado a 'IN_PROGRESS'.`,
                reporte_id: report_id,  // Usar el report_id correcto
                estado: 'IN_PROGRESS'
            };

            // Crear la notificación
            await Notificacion.crearNotificacionService(notificacionData);

            // Respuesta exitosa
            api_validator.successServer(req, res, null, 'Notificación de cambio de estado creada correctamente');
        } else {
            // Si la respuesta de Flask no es exitosa
            throw new Error('Error en la respuesta de Flask');
        }
    } catch (error) {
        console.error('Error al cambiar el estado del reporte y crear la notificación:', error);
        api_validator.errorServer(req, res, error, 'Error al crear la notificación de cambio de estado');
    }
};


exports.cancelReporte = async (req, res) => {
    try {
        const { report_uuid } = req.body;  // Recibimos el UUID del reporte

        // Verificamos si el UUID está presente
        if (!report_uuid) {
            return res.status(400).json({ msg: 'El UUID del reporte es obligatorio' });
        }

        // Paso 1: Llamar a la API de Flask para actualizar el estado a CANCEL
        const response = await axios.post('http://127.0.0.1:5001/report/cancel', { report: report_uuid });

        // Verificar si la respuesta de Flask es correcta
        if (response.status === 200) {
            console.log('Respuesta de Flask:', response.data);

            // Aquí accedemos a 'reporte' en lugar de 'context' para obtener el report_id
            const report_id = response.data.context?.reporte;  // `reporte` contiene el `report_id`

            if (!report_id || isNaN(report_id)) {
                throw new Error('No se recibió un report_id válido desde Flask');
            }

            // Paso 2: Crear la notificación después de cambiar el estado del reporte
            const notificacionData = {
                titulo: 'El reporte ha comenzado',
                mensaje: `El reporte con ID ${report_uuid} ha cambiado su estado a 'CLOSED'.`,
                reporte_id: report_id,  // Usar el report_id correcto
                estado: 'CLOSED'
            };

            // Crear la notificación
            await Notificacion.crearNotificacionService(notificacionData);

            // Respuesta exitosa
            api_validator.successServer(req, res, null, 'Notificación de cambio de estado creada correctamente');
        } else {
            // Si la respuesta de Flask no es exitosa
            throw new Error('Error en la respuesta de Flask');
        }
    } catch (error) {
        console.error('Error al cambiar el estado del reporte y crear la notificación:', error);
        api_validator.errorServer(req, res, error, 'Error al crear la notificación de cambio de estado');
    }
};

exports.finishReporte = async (req, res) => {
    try {
        const { report_uuid } = req.body;  // Recibimos el UUID del reporte

        // Verificamos si el UUID está presente
        if (!report_uuid) {
            return res.status(400).json({ msg: 'El UUID del reporte es obligatorio' });
        }

        // Paso 1: Llamar a la API de Flask para actualizar el estado a RESOLVED
        const response = await axios.post('http://127.0.0.1:5001/report/finish', { report: report_uuid });

        // Verificar si la respuesta de Flask es correcta
        if (response.status === 200) {
            console.log('Respuesta de Flask:', response.data);

            // Aquí accedemos a 'reporte' en lugar de 'context' para obtener el report_id
            const report_id = response.data.context?.reporte;  // `reporte` contiene el `report_id`

            if (!report_id || isNaN(report_id)) {
                throw new Error('No se recibió un report_id válido desde Flask');
            }

            // Paso 2: Crear la notificación después de cambiar el estado del reporte
            const notificacionData = {
                titulo: 'El reporte ha comenzado',
                mensaje: `El reporte con ID ${report_uuid} ha cambiado su estado a 'RESOLVED'.`,
                reporte_id: report_id,  // Usar el report_id correcto
                estado: 'RESOLVED'
            };

            // Crear la notificación
            await Notificacion.crearNotificacionService(notificacionData);

            // Respuesta exitosa
            api_validator.successServer(req, res, null, 'Notificación de cambio de estado creada correctamente');
        } else {
            // Si la respuesta de Flask no es exitosa
            throw new Error('Error en la respuesta de Flask');
        }
    } catch (error) {
        console.error('Error al cambiar el estado del reporte y crear la notificación:', error);
        api_validator.errorServer(req, res, error, 'Error al crear la notificación de cambio de estado');
    }
};


exports.getAllNotificacionesusuario = async (req, res) => {
    try {
        console.log("Parámetros recibidos:", req.params);

        const { user_id } = req.params;
        if (!user_id) {
            return api_validator.errorServer(req, res, 400, "El user_id es obligatorio.");
        }

        console.log(`Haciendo petición a Flash: http://127.0.0.1:5001/report/all/${user_id}`);

        // 1️⃣ Hacer una solicitud a la API de reportes en Flash para obtener todos los reportes del usuario
        const reportesResponse = await axios.get(`http://127.0.0.1:5001/report/all/${user_id}`);

        console.log("Respuesta de la API de reportes:", reportesResponse.data);

        if (!reportesResponse.data.context || reportesResponse.data.context.length === 0) {
            return api_validator.successServer(req, res, [], 'No hay reportes para este usuario.');
        }

        // 2️⃣ Obtener todos los IDs de reportes asociados al usuario
        const reporteIds = reportesResponse.data.context.map(r => r.id); // <-- Aquí usamos `r.id`, no `r.uid`
        console.log("IDs de reportes obtenidos:", reporteIds);

        // 3️⃣ Si el usuario no tiene reportes, devolver lista vacía
        if (reporteIds.length === 0) {
            return api_validator.successServer(req, res, [], 'No hay notificaciones para estos reportes.');
        }

        // 4️⃣ Construir y ejecutar la consulta SQL para obtener TODAS las notificaciones de los reportes del usuario
        const placeholders = reporteIds.map(() => '?').join(','); // (?, ?, ?)
        const sql = `SELECT * FROM notificaciones WHERE reporte_id IN (${placeholders})`;

        const [notificaciones] = await pool.query(sql, reporteIds);
        console.log("Notificaciones encontradas:", JSON.stringify(notificaciones, null, 2));

        // 5️⃣ Enviar respuesta con notificaciones
        return api_validator.successServer(req, res, notificaciones, 'Notificaciones encontradas correctamente');
    } catch (error) {
        console.error("Error en la API de notificaciones:", error);

        if (error.response) {
            console.error("Detalles del error de Axios:", error.response.data);
        }

        return api_validator.errorServer(req, res, 500, error);
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

