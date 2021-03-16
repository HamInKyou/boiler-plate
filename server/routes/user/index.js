const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/user.ctrl");
const { auth } = require("../../middleware/auth");

// 회원가입하기
router.post("/register", ctrl.createUser);

// 로그인하기
router.post("/login", ctrl.loginUser);

// 로그아웃하기
router.get("/logout", auth, ctrl.logoutUser);

// 유저 인증
router.get("/auth", auth, ctrl.authUser);

module.exports = router;
