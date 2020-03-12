const express = require("express");
const user = require("./userDb");
const post = require("../posts/postDb");

const router = express.Router();
router.use(express.json());

router.post("/", (req, res) => {
  user
    .insert(req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/:id/posts", (req, res) => {
  post.insert(req.body).then((response) => {
    res.status(200).json(response);
  });
});

router.get("/", (req, res) => {
  user
    .get()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
  user
    .getById(req.params.id)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ error: `bad request did not find user post, try again` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id/posts", (req, res) => {
  user
    .getUserPosts(req.params.id)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ error: `bad request did not find user post, try again` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
