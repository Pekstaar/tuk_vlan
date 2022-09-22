const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const cors = require("cors");
const { errorHandler, notFound } = require("./middleware/errorMiddleWare");
const bodyParser = require("body-parser");
const { roomHandler } = require("./socket/room");
// const { errorHandler } = require("./middleware/errorMiddleware");

// start db connection:
connectDB();
const app = express();

app.use([
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
]);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/call", require("./routes/callRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(notFound);
app.use(errorHandler);

// app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);

// let users = [];

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to Socket.io");

  socket.on("setup", (uData) => {
    socket.join(uData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: ", room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessage) => {
    var chat = newMessage.chat;

    if (!chat.users) return console.log("Chat.users not defined!");

    chat.users.forEach((user) => {
      if (user._id === newMessage.sender._id) return;

      socket.in(user._id).emit("message received", newMessage);
    });
  });

  // call socket

  roomHandler(socket);

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
