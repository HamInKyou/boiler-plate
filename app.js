const express = require("express");

// db 관련
const db = require("./models");

class App {
  constructor() {
    this.app = express();

    // db 접속
    this.dbConnection();

    // 미들웨어 셋팅
    this.setMiddleWare();

    // 라우팅
    this.getRouting();
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

  // 라우팅
  getRouting() {
    this.app.use(require("./routes"));
  }
}

module.exports = new App().app;
