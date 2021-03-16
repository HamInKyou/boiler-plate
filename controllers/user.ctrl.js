const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//회원가입하기
exports.createUser = async (req, res, next) => {
  const { userId, password, ...rest } = req.body;
  try {
    //이미 해당 유저가 존재할 경우
    const exUser = await User.findOne({ where: { userId } });
    if (exUser) {
      const error = new Error("이미 해당 아이디의 유저가 존재합니다.");
      error.status = 409;
      throw error;
    }

    //비번 암호화
    const hash = await bcrypt.hash(password, 12);

    //유저 생성
    const newUser = await User.create({
      name: rest.name,
      userId: userId,
      password: hash,
    });

    const status = 200;
    const resBody = {
      status,
      newUser,
    };
    return res.status(status).send(resBody);
  } catch (error) {
    return next(error);
  }
};

//로그인하기
exports.loginUser = async (req, res, next) => {
  try {
    const { userId, password } = req.body;
    //요청된 아이디를 데이터베이스에서 있는지 찾는다.
    const user = await User.findOne({ where: { userId } });
    if (!user) {
      //요청된 아이디가 데이터베이스에서 없다면
      const error = new Error("해당 유저가 존재하지 않습니다.");
      error.status = 401;
      throw error;
    }

    //요청된 아이디가 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      //비밀번호가 틀리다면
      const error = new Error("비밀번호가 틀립니다.");
      error.status = 401;
      throw error;
    }

    //비밀번호까지 맞다면 토큰을 생성하기

    //jsonwebtoken을 이용해서 token 생성
    try {
      //user.id 와 process.env.COOKIE_SECRET을 붙여서 토큰을 만들어준다.
      //반대로 토큰에서 process.env.COOKIE_SECRET을 빼면 user.id가 나오겠지!
      const token = jwt.sign(user.id, process.env.COOKIE_SECRET);

      //DB에 유저에게 할당한 토큰 업데이트
      await User.update(
        { token },
        {
          where: { id: user.id },
        }
      );

      //유저에게 돌려보낼 body
      const resBody = {
        loginSuccess: true,
        userId: user.id,
      };

      //유저에게 돌려보낼 때 토큰을 쿠키에 저장해서 쿠키를 같이 보낸다.
      res.cookie("x_auth", token).status(200).send(resBody);
    } catch (error) {
      error.status = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
