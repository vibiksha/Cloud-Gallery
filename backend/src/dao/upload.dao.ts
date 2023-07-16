import { imageUpload } from "../models/imageUpload";

export const upload = async (uid:string,key:string) => {
  const newUpload = new imageUpload();
  newUpload.userId=uid;
  newUpload.key=key;
  // Save the new user to the database
  await newUpload.save();

};
