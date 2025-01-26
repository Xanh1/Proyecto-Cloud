var express = require('express');
var router = express.Router();
const notificacionController = require('../controllers/notificacion.controller');



router.get('/all', notificacionController.getAllNotificaciones); // Obtener todas las notificaciones
router.get('/:id', notificacionController.getNotificacionById); // Obtener una notificación por ID
//router.put('/update/:id', notificacionController.actualizarNotificacion); // Actualizar una notificación
router.post('/crear', notificacionController.crearNotificacion); // Crear una nueva notificación
router.delete('/eliminar/:id', notificacionController.deleteNotificacion); // Eliminar una notificación

module.exports = router;