// // server.js
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
//
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//   },
// });
//
// const PORT = process.env.PORT || 5000;
//
// io.on('connection', (socket) => {
//   console.log('Novo cliente conectado:', socket.id);
//
//   socket.on('create_room', (data) => {
//     const { id_user, time, rounds, max_members, themes } = data;
//     const code_lobby = Math.random().toString(36).substring(2, 8).toUpperCase(); // Gerar código da sala
//     socket.join(code_lobby);
//     socket.emit('room_created', { msg: `Código da sala: ${code_lobby}.` });
//     console.log(`Sala criada com código: ${code_lobby}`);
//   });
//
//   socket.on('disconnect', () => {
//     console.log('Cliente desconectado:', socket.id);
//   });
// });
//
// server.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });