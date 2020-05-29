const express = require("express");
const router = express.Router();

const { verifyToken, apiLimiter } = require("./middlewares");

//통신 확인을 위한 가상의 USER
router.get("/", apiLimiter, verifyToken, (req, res) => {
  const users = [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
    { id: 3, name: "test3" },
  ];

  res.json(users);
});

//id를 사용하기 위한 가상의 USER
router.get("/:id", apiLimiter, verifyToken, async (req, tes) => {
  const users = [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
    { id: 3, name: "test3" },
  ];

  //find user
  user = users.find((u) => u.id === parseInt(req.params.id));
  res.send(user);
});

module.exports = router;
