require('dotenv').config();
const server = require('./app');
const pool = require('./src/config/database/db');
const crearTablaNotificacion = require('./src/services/crearTablaNotificacion');

const PORT = process.env.PORT || 3000;
const SERVER = process.env.SERVER || 'localhost';

async function initDB() {
  try {
    await pool.query(crearTablaNotificacion);
    console.log('Tabla de notificaciones creada o verificada correctamente.');
  } catch (error) {
    console.error('Error al crear o verificar la tabla de notificaciones:', error);
    process.exit(1); 
  }
}

async function startServer() {
  try {
    server.listen(PORT, () => {
      console.log(`Servidor ejecutándose en ${SERVER}:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1); 
  }
}

async function main() {
  await initDB();
  await startServer();
}

main().catch(error => {
  console.error('Error en la inicialización de la aplicación:', error);
  process.exit(1);
});