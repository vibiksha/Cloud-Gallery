import { Sequelize } from "sequelize-typescript";
import { imageUpload } from "../models/imageUpload";
import { User } from "../models/user";

const connection = new Sequelize({
  host: "project.crvminiqdjul.us-east-1.rds.amazonaws.com",
  dialect: "mysql",
  username: "admin",
  password: "password123",
  database: "project",
  logging: false,
  models: [User, imageUpload],
});

export default connection;
