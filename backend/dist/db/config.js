"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const imageUpload_1 = require("../models/imageUpload");
const user_1 = require("../models/user");
const connection = new sequelize_typescript_1.Sequelize({
    host: "project.cze3j8hp6oyt.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
    username: "admin",
    password: "Password123",
    database: "Project",
    logging: false,
    models: [user_1.User, imageUpload_1.imageUpload],
});
exports.default = connection;
