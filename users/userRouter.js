const express = require("express");
const user = require("./userDb");
const post = require("../posts/postDb");

const router = express.Router();
router.use(express.json());

router.post("/", validatePost, validateUser, (req, res) => {
  user
    .insert(req.body)
    .then((response) => {
      console.log(response);
      res.status(201).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/:id/posts", validatePost, validateUserId, (req, res) => {
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
  user
    .remove(req.params.id)
    .then((response) => {
      if (response === 1) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ error: `bad request did not find user, try again` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.put("/:id", (req, res) => {
  user
    .update(req.params.id, req.body)
    .then((response) => {
      if (response === 1) {
        res.status(200).json({ message: `Successfully updated name` });
      } else {
        res
          .status(404)
          .json({ error: `bad request did not find user, try again` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  if (req.body.user_id == req.params.id) {
    req.user = req.body;
    next();
  } else {
    res.status(400).json({ message: "invalid user id" });
  }
}

function validateUser(req, res, next) {
  if (req.body.name) {
    next();
  } else if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  }
}

function validatePost(req, res, next) {
  if (req.body.text && req.body.user_id) {
    next();
  } else if (req.body.name) {
    next();
  } else if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text || !req.body.user_id) {
    res.status(400).json({ message: "missing required text field" });
  }
}

module.exports = router;
