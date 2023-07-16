import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user";

export const createUser = async (req: any) => {
  const uid = uuidv4();
  const newUser = new User();
  newUser.id = uid;
  newUser.username = req.body.username;
  newUser.email = req.body.email;
  newUser.phoneNumber = req.body.phoneNumber;
  // Save the new user to the database
  const user = await newUser.save();
  return user;
};
