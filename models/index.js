"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = require("dotenv");

env.config();

const DATABASE = process.env.DATABASE;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const config = {
  host: `${DB_HOST}`,
  dialect: "mysql",
};

const sequelize = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, config);

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".js") && file !== "index.js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
