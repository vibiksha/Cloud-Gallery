import { Request, Response } from 'express';
import AWS from 'aws-sdk';
import * as uploadDao from '../dao/upload.dao';
import { AWSConfigAttributes } from '../constants/env.constants';
import { decodeJwtTokenFromHeaders } from './decodeToken';

export const handleFileUpload = async (req: Request, res: Response) => {
  const fileName = req.body.fileName;
  const config = {
    bucketName: 'aws-image-gallery-project',
    region: AWSConfigAttributes.REGION,
    accessKeyId: AWSConfigAttributes.ACCESS_KEY_ID,
    secretAccessKey: AWSConfigAttributes.SECRET_ACCESS_KEY,
  };

  const s3 = new AWS.S3({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region,
  });
  const params = {
    Bucket: config.bucketName,
    Key: `${Date.now()}-${fileName}`,
    ContentType: 'image/jpeg',
    ACL: 'private',
    Expires: 3600, // Expiration time in seconds
  };

  // Generate the pre-signed URL
  s3.getSignedUrl('putObject', params, async (err, url) => {
    if (err) {
      console.error('Error generating pre-signed URL:', err);
      return res.status(500).json({ error: 'Failed to generate pre-signed URL' });
    }
    const token: string = req.headers.authorization as string;
    const decodedToken = decodeJwtTokenFromHeaders(token);
    if (decodedToken && decodedToken.preferred_username) {
      const bucketKey = params.Key;
      try {
        await uploadDao.upload(decodedToken.preferred_username, bucketKey);
      } catch (error) {
        console.error('Error inserting bucket key into database:', error);
        return res.status(500).json({ error: 'Failed to insert bucket key into database' });
      }
    }

    // Return the pre-signed URL to the client
    res.json({ preSignedUrl: url, bucketKey: params.Key });
  });
};

// function decodeJwtTokenFromHeaders(req: Request): any | null {
//   const authorizationHeader = req.headers.authorization;
//   if (authorizationHeader && typeof authorizationHeader === 'string') {
//     const [bearer, token] = authorizationHeader.split(' ');
//     if (bearer === 'Bearer' && token) {
//       try {
//         const decoded = jwt.decode(token);
//         return decoded;
//       } catch (error) {
//         console.error('Error decoding token:', error);
//         return null;
//       }
//     }
//   }
//   return null;
// }
