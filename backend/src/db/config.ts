import { Sequelize } from "sequelize-typescript";
import { imageUpload } from "../models/imageUpload";
import { User } from "../models/user";

const connection = new Sequelize({
  host: "project.cze3j8hp6oyt.us-east-1.rds.amazonaws.com",
  dialect: "mysql",
  username: "admin",
  password: "Password123",
  database: "Project",
  logging: false,
  models: [User, imageUpload],
});

export default connection;
