var express = require('express');
var router = express.Router();
const notificacionController = require('../controllers/notificacion.controller');

router.post('/create', notificacionController.crearNotificacion); // Crear una notificación
router.get('/get/:uid', notificacionController.getNotificacionesByUid); // Obtener una notificación por ID
router.post('/notificar/municipales', notificacionController.notificarAllMunicipales); // Notificar a todos los municipales
module.exports = router;