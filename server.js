const express = require("express");
//Routes
const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter.js");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now());
  next();
}

//

server.use("/post", logger, postRouter);
server.use("/user", logger, userRouter);

module.exports = server;
