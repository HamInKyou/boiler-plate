const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/user.ctrl");

// 회원가입하기
router.post("/register", ctrl.createUser);

// 로그인하기
router.post("/login", ctrl.loginUser);

module.exports = router;
