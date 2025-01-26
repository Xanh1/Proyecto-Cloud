const pool = require('../config/database/db');

exports.crearNotificacionService = async (data) => {
  try {
    const sql = `
      INSERT INTO notificaciones (titulo, mensaje, estado, reporte_id) 
      VALUES (?, ?, ?, ?);
    `;
    const [result] = await pool.query(sql, [data.titulo, data.mensaje, data.estado,data.reporte_id]);
    return result; 
  } catch (error) {
    throw new Error('Error creando notificación: ' + error.message);
  }
};

exports.getAllNotificacionesService = async () => {
  try {
    const sql = 'SELECT * FROM notificaciones';
    const [notificaciones] = await pool.query(sql);
    return notificaciones;
  } catch (error) {
    throw new Error('Error obteniendo notificaciones: ' + error.message);
  }
};

exports.getNotificacionService = async (id) => {
  try {
    const sql = 'SELECT * FROM notificaciones WHERE id = ?';
    const [notificacion] = await pool.query(sql, [id]);
    return notificacion[0];  
  } catch (error) {
    throw new Error('Error obteniendo notificación por ID: ' + error.message);
  }
};

exports.actualizarNotificacion = async (id, data) => {
  try {
    const query = `
      UPDATE notificaciones 
      SET titulo = ?, mensaje = ?, estado = ?, updatedAt = NOW() 
      WHERE id = ?
    `;
    const [result] = await pool.execute(query, [data.titulo, data.mensaje, data.estado, id]);
    if (result.affectedRows === 0) {
      return null; 
    }
    return { id, ...data }; 
  } catch (error) {
    throw new Error('Error actualizando notificación: ' + error.message);
  }
};

exports.eliminarNotificacionService = async (id) => {
  try {
    const sql= 'DELETE FROM notificaciones WHERE id = ?';
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) {
      return null; 
    }
    return { message: 'Notificación eliminada correctamente' };
  } catch (error) {
    throw new Error('Error eliminando notificación: ' + error.message);
  }
};
