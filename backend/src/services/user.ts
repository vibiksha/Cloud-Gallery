import { RequestHandler } from "express";
import { createCognitoUser } from '../utils/cognito.utils';
import * as UserDao from "../dao/user.dao";
export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const newUser = await UserDao.createUser(req);
    await createCognitoUser(newUser.username, newUser.email, newUser.phoneNumber, req.body.password, newUser.id);

    return res.status(200).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Error creating user" });
  }
};
