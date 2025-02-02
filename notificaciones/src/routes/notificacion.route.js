var express = require('express');
var router = express.Router();
const notificacionController = require('../controllers/notificacion.controller');



router.get('/all', notificacionController.getAllNotificaciones); // Obtener todas las notificaciones
router.get('/:id', notificacionController.getNotificacionById); // Obtener una notificación por ID
//router.put('/update/:id', notificacionController.actualizarNotificacion); // Actualizar una notificación
router.post('/crear', notificacionController.crearNotificacion); // Crear una nueva notificación
router.post('/estadoenprogreso', notificacionController.startReporte); //Cambias estado a en progreso
router.post('/estadocancelado', notificacionController.cancelReporte); //Cambias estado a en cancelado
router.post('/estadofinalizar', notificacionController.finishReporte); //Cambias estado a en finalizar
router.delete('/eliminar/:id', notificacionController.deleteNotificacion); // Eliminar una notificación
router.get('/allnotificacionesusuario/:user_id', notificacionController.getAllNotificacionesusuario); // Obtener todas las notificaciones del usuario

module.exports = router;