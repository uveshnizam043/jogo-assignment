const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const utlis = require("./utlis.js");
const { Server } = require("socket.io");
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  socket.on("disconnect-connection", (id) => {
    const users = utlis.removeUser(id);
    socket.emit("updateUsers", users);
  });
  socket.on("user_join", (data) => {
    const { user, users } = utlis.addUser(data);
    socket.emit("user_join", users, user);
    socket.broadcast.emit("updateUsers", users);
  });
  socket.on("send_message", (msg) => {
    socket.broadcast.emit("send_message", msg);
  });
  socket.on("logout_user", (id) => {
    utlis.removeUser(id);
    socket.broadcast.emit("logout_user", id);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
  socket.on("stoptyping", () => {
    socket.broadcast.emit("stoptyping");
  });
});

server.listen(3001, () => {
  console.log("Server is running at 3001");
});
