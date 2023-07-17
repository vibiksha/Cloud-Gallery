import { Request, Response } from "express";
import AWS from "aws-sdk";
import { deleteFromDatabase } from "../dao/delete.dao";
import { BUCKET_NAME } from "../constants/env.constants";

export const deleteObject = async (req: Request, res: Response) => {
  const fileName = req.body.fileName;
  console.log(fileName);
  try {
    const s3 = new AWS.S3({
      credentials: {
        accessKeyId: "AKIAUXS5YJ6EDXWQ2QKB",
        secretAccessKey: "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",
      },
      region: "us-east-1",
    });
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
    };

    await s3.deleteObject(params).promise();
    await deleteFromDatabase(fileName);

    res.status(200).json({ message: "Object deleted successfully" });
  } catch (error) {
    console.error("Error deleting object:", error);
    res.status(500).json({ error });
  }
};
