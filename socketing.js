const express = require("express");
const app = express();
const mongoose= require('mongoose')
const http = require("http").createServer(app);
const messageDb= require("./models/model")
const io = require("socket.io")(http);
app.use(express.static("public"))

//defining dbConnection
const dbUrl= 'mongodb://127.0.0.1:27017/WebSockets'
mongoose.connect(dbUrl)
.then((console.log("connected to db")))
.catch((err)=>console.log(err))
// set up the route for serving your index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


// set up a socket.io connection handler
io.on("connection", (socket) => {
  console.log("User connected");

  // handle incoming messages from the client
  socket.on("message", (message) => {
    console.log("message: ", message);

    const newMessage= new messageDb({text:message})
    newMessage.save()
    
    // broadcast the message to all clients connected
    io.emit("message", message);
  });

  // handle disconnecting clients
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// start the server
http.listen(3000, () => {
  console.log("The server is listening on port 3000..");
});
