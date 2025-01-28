
const crearTablaNotificacion = `
        CREATE TABLE IF NOT EXISTS notificaciones (
          id INT AUTO_INCREMENT PRIMARY KEY,
          titulo VARCHAR(255) NOT NULL,
          mensaje TEXT NOT NULL,
          estado TEXT NOT NULL,
          reporte_id INT NOT NULL
        );
      `;


module.exports = crearTablaNotificacion;
