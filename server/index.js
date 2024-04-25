import express from "express";
import { Server, Socket } from "socket.io";
import bodyParser from "body-parser";

const app = express();
const io = Server(); //creating the socket server

const emailToSocketMapping = new Map();

app.use(bodyParser.json());
io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    const { emailId, roomId } = data;
    console.log("User", emailId, "Joined Room ", roomId);
    emailToSocketMapping.set(emailId, socket.id);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-join", { emailId }); //This means that all other clients in the same room will receive this event. The event data includes the emailId of the user who joined the room.
  });
});

app.listen(8000, () => {
  console.log("Server is started on port 8000");
});
io.listen(8001);
