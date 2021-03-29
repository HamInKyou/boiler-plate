const express = require("express");
const cookieParser = require("cookie-parser");

// db 관련
const db = require("./models");

class App {
  constructor() {
    this.app = express();

    // db 접속
    this.dbConnection();

    // 미들웨어 셋팅
    this.setMiddleWare();

    // cookieParser 셋팅
    this.setCookieParser();

    // 라우팅
    this.getRouting();

    // 라우트를 찾을수가 없음
    this.status404();

    // 에러처리
    this.errorHandler();
  }

  // DB 접속
  async dbConnection() {
    try {
      await db.sequelize.authenticate();
      console.log("Connection has been established successfully.");
      await db.sequelize.sync();
      console.log("DB Sync complete.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  // 미들웨어 셋팅
  setMiddleWare() {
    //body-parser 셋팅
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  setCookieParser() {
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
  }

  // 라우팅
  getRouting() {
    this.app.use("/api", require("./routes"));
  }

  status404() {
    this.app.use((req, _, next) => {
      const error = new Error(`${req.method} ${req.url} Router Not Found`);
      error.status = 404;
      next(error);
    });
  }

  errorHandler() {
    this.app.use((err, req, res, _) => {
      const status = err.status || 500;
      const errBody = {
        success: false,
        message: err.message,
      };
      return res.status(status).send(errBody);
    });
  }
}

module.exports = new App().app;
