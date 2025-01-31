const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
const { setIo } = require('./src/services/socket');
const notificationRoutes = require('./src/routes/notificacion.route');

const app = express();
app.use(express.json()); 
app.use(morgan('dev'));
app.use(helmet()); 
app.use(cors());


app.use('/notificaciones', notificationRoutes);

app.use(function (req, res, next) {
  res.status(404).json({
    error:"RUTA NO ENCONTRADA" 
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Error interno del servidor',
    },
  });
});


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});

setIo(io);

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado:', socket.id);
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});


module.exports = server;
