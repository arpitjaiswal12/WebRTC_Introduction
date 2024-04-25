import express from "express";
import { Server, Socket } from "socket.io";
import bodyParser from "body-parser";

const app = express();
const io = Server(); //creating the socket server

app.use(bodyParser.json());


app.listen(8000, () => {
  console.log("Server is started on port 8000");
});
io.listen(8001);
