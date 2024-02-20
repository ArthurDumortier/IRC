const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const conversationRoutes = require("./routes/conversation");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
var leoProfanity = require("leo-profanity");
var frenchBadwordsList = require("french-badwords-list");

// leoProfanity.clearList();
leoProfanity.add(frenchBadwordsList.array);

// Allowed origins
const allowedOrigins = ["http://localhost:8080", "https://www.dolphinchat.app"];

const app = express();
const server = createServer(app);
const port = process.env.PORT || 5000;

// Configure CORS with specific origins
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // Enable credentials
  })
);

mongoose
  .connect("mongodb://mongo:27017/dolphinchat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => {
    console.log(error);
  });

// socket io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  // someone join a room
  socket.on("join", (room) => {
    socket.join(room);
    console.log("Joining room: " + room);
  });

  // someone send a message
  socket.on("message", (id, msg) => {
    if (leoProfanity.check(msg.content)) {
      console.log("injure détecter");
    }
    msg.content = leoProfanity.clean(msg.content);
    io.in(id).emit("message", id, msg);
    console.log("message: " + msg.content);
  });

  // someone writing in chat
  socket.on("isWriting", (id, isWriting) => {
    socket.in(id).emit("isWriting", isWriting);
    console.log("someone is writing");
  });

  // someone disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/messages", require("./routes/message"));
app.use("/api/conversations", conversationRoutes);
