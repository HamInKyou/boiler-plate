const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));

router.get("/hello", (req, res) => res.send("안녕?"));
module.exports = router;
