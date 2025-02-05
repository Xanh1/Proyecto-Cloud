const crearTablaNotificacion = `
    CREATE TABLE IF NOT EXISTS notificaciones (
      id INT AUTO_INCREMENT PRIMARY KEY,
      uid VARCHAR(36) NOT NULL DEFAULT (UUID()),
      titulo VARCHAR(255) NOT NULL,
      mensaje TEXT NOT NULL,
      estado_reporte TEXT NOT NULL,
      reporte_id VARCHAR(150) NOT NULL,
      user_uid VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

module.exports = crearTablaNotificacion;