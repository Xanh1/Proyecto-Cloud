let io;

function setIo(ioInstance) {
  io = ioInstance;
}

function getIo() {
  if (!io) {
    throw new Error("Socket.io no está inicializado");
  }
  return io; 
}

module.exports = { setIo, getIo };
