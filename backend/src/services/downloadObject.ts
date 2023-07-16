import { Request, Response } from 'express';
import AWS from 'aws-sdk';
import * as uploadDao from '../dao/upload.dao';
import { AWSConfigAttributes, BUCKET_NAME } from '../constants/env.constants';
export const downloadObject = async (req: Request, res: Response) => {
    AWS.config.update({
        region: AWSConfigAttributes.REGION,
        accessKeyId: AWSConfigAttributes.ACCESS_KEY_ID,
        secretAccessKey: AWSConfigAttributes.SECRET_ACCESS_KEY,
      });
      
      const s3 = new AWS.S3();
  
    const params = { Bucket: BUCKET_NAME, Key: req.body.key }; 
  
    s3.getObject(params, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error fetching image');
      }
  
      res.writeHead(200, {
        'Content-Type': data.ContentType,
        'Content-Length': data?.ContentLength?.toString(),
      });
  
      res.end(data.Body);
    });
  };