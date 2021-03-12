const { User } = require("../models");

//회원가입하기
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      userId: req.body.userId,
      password: req.body.password,
    });

    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
