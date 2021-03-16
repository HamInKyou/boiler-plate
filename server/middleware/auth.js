const { User } = require("../models");
const jwt = require("jsonwebtoken");

//인증 처리를 하는 곳
const auth = async (req, res, next) => {
  //1. 클라이언트 쿠키에서 토큰을 가져온다.
  const token = req.cookies.x_auth;

  //2. 토큰을 복호화 한 후 유저를 찾는다.
  const userId = jwt.verify(token, process.env.COOKIE_SECRET);

  try {
    const user = await User.findOne({ where: { id: userId, token } });
    if (!user) {
      //유저가 없으면 인증 No!
      const resBody = {
        isAuth: false,
        errorMessage: "인증 실패",
      };
      return res.send(resBody);
    }

    //유저가 있으면 인증 Okay!
    //req에 인증된 유저 정보와 토큰을 넣어서 next해서 넘어간 곳에서도 쓸 수 있게!
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    return res.send(error);
  }
};

module.exports = { auth };
