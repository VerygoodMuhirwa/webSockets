const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

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
