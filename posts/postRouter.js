const express = require("express");
const post = require("./postDb");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  post
    .get()
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
  post
    .getById(req.params.id)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ error: `bad request did not find post, try again` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:id", (req, res) => {
  post
    .remove(req.params.id)
    .then((response) => {
      if (response === 1) {
        res.status(201).json({ message: "Delete Post" });
      } else {
        res.status(500).json({ message: "Failed to delete post" });
      }
    })
    .catch((error) => {
      res
        .status(404)
        .json({ error: `bad request did not find post, to delete` });
    });
});

router.put("/:id", (req, res) => {
  post
    .update(req.params.id, req.body)
    .then((response) => {
      if (response === 1) {
        res.status(201).json({ message: "Updated Post" });
      } else {
        res.status(500).json({ message: "Failed to update post" });
      }
    })
    .catch((error) => {
      res
        .status(404)
        .json({ error: `bad request did not find post, try again` });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
