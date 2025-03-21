const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors());
const { Server } = require("socket.io");

const server = http.createServer (app);

const io = new Server (server, {
    cors: {
      origin: "https://client-zk6i.vercel.app",
      methods: ["GET", "POST"],
    },
      
  });
  
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
     
    socket.on("join_room", (data) => {
      socket.join(data)
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
      socket.to(data.room).emit("recieve_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
});
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`SERVER RUNNING on port ${PORT}`);
});

