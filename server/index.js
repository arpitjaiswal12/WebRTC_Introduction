import express from "express";
import { Server, Socket } from "socket.io";
import bodyParser from "body-parser";

const app = express();
const io = new Server({
  cors: true,
}); //creating the socket server

const emailToSocketMapping = new Map();
const socketToEmailMapping = new Map();

app.use(bodyParser.json());
io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    const { emailId, roomId } = data;
    console.log("User", emailId, "Joined Room ", roomId);
    emailToSocketMapping.set(emailId, socket.id);
    socketToEmailMapping.set(socket.id, emailId);
    socket.join(roomId);
    socket.emit("joined-room", { roomId });
    socket.broadcast.to(roomId).emit("user-joined", { emailId }); //This means that all other clients in the same room will receive this event. The event data includes the emailId of the user who joined the room.
  });

  socket.on("call-user", (data) => {
    const { emailId, offer } = data;
    const fromEmail = socketToEmailMapping.get(socket.id);
    const socketId = emailToSocketMapping.get(emailId);
    socket.to(socketId).emit("incomming-call", { from: fromEmail, offer });
  });

  socket.on("call-accepted", (data) => {
    const { emailId, ans } = data;
    const socketId = emailToSocketMapping.get(emailId);
    socket.to(socketId).emit("call-accepted",{ans})
  });
});

app.listen(8000, () => {
  console.log("Server is started on port 8000");
});
io.listen(8001);
