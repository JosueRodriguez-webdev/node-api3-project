const express = require("express");
const helper = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const ID = req.params.id;

  helper
    .getById(ID)
    .then((r) => {
      if (!r) {
        return res.status(400).json({ message: "invalid user id" });
      }
      req.user = r;
      next();
    })
    .catch((e) => {
      return res.status(400).json({ message: "missing required name field" });
    });
}

function validateUser(req, res, next) {
  if (!req.body || Object.keys(req.body) == 0) {
    return res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    return res.status(400).json({ message: "missing required name field" });
  }

  next();
}

function validatePost(req, res, next) {
  if (!req.body || Object.keys(req.body) == 0) {
    return res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    return res.status(400).json({ message: "missing required text field" });
  }
  next();
}

module.exports = router;
