// ws-server.js
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('Khách hàng đã kết nối:', socket.id);

  socket.on('send_message', (msg) => {
    // Gửi lại cho tất cả client (hoặc chỉ admin)
    io.emit('receive_message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Khách hàng đã ngắt kết nối:', socket.id);
  });
});

server.listen(4000, () => console.log('WebSocket server running on port 4000'));