import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http"; // Import createServer function from http module
import { Server } from "socket.io"; // Import Server class from socket.io
import { connection } from "./database/database.js";
import router from "./routes/auth.js";
import messageRoute from "./routes/messages.js";

dotenv.config();

const port = process.env.PORT || 8060;
const origin=process.env.ORIGIN;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", router);
app.use("/api/msg", messageRoute);

const server = createServer(app); // Create HTTP server instance

connection();

server.listen(port, () => {
  console.log(`Port Is Running On http://localhost:${port}`);
});

const io = new Server(server, {
  // Initialize socket.io with the HTTP server instance
  cors: {
    origin:origin,
    credentials: true,
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
