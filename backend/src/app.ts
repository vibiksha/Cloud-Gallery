import express, { Request, Response, NextFunction } from 'express';
import connection from './db/config';
import cors from'cors';
import { json, urlencoded } from 'body-parser';
import {createUserRoutes} from './routes/auth';
import AWS from 'aws-sdk';
import { AWSConfigAttributes } from './constants/env.constants';

const app = express();
app.use(cors());
import multer from 'multer';
import { uploadRoutes } from './routes/upload';
import { displayRoutes } from './routes/display';
import { deleteRoutes } from './routes/delete';
import { request } from 'http';
import { downloadRoutes } from './routes/download';

// Configure AWS SDK
AWS.config.update({
  region: AWSConfigAttributes.REGION,
  accessKeyId: AWSConfigAttributes.ACCESS_KEY_ID,
  secretAccessKey: AWSConfigAttributes.SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials if required
  // Add more specific headers if needed

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Max-Age', '3600'); // Set max age for preflight requests
    res.status(204).end();
    return;
  }

  next();
});


app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/auth", createUserRoutes);
app.use('/upload', uploadRoutes);
app.use('/display',displayRoutes);
app.use('/delete',deleteRoutes);
app.use('/download',downloadRoutes); 

connection.sync()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Connection problem:", err);
  });
