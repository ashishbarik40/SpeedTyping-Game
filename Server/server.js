const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 5000;

const rooms = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  // Join a room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    const username = `User ${socket.id}`;
    socket.username = username;
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    rooms[roomId].push({ id: socket.id, username });
    io.to(roomId).emit("roomUsers", rooms[roomId]);
    console.log(`${username} joined room ${roomId}`);
  });

  // Leave a room
  socket.on("leaveRoom", (roomId) => {
    const roomUsers = rooms[roomId];
    if (roomUsers) {
      rooms[roomId] = roomUsers.filter((user) => user.id !== socket.id);
      io.to(roomId).emit("roomUsers", rooms[roomId]);
      console.log(`${socket.username} left room ${roomId}`);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter((user) => user.id !== socket.id);
      io.to(roomId).emit("roomUsers", rooms[roomId]);
    }
    console.log(`${socket.username} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
