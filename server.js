const express = require("express");
const user = require("./users/userRouter");
const post = require("./posts/postRouter");

const server = express();
server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("/api/user", user);

server.use("/api/post", post);

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const URL = req.url;
  const timestamp = Date.now();

  if (method && URL && timestamp) {
    console.log(method, URL, timestamp);
    next();
  }
}

module.exports = server;
