const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/user.ctrl");

// 댓글 작성하기
router.post("/", ctrl.createUser);

module.exports = router;
