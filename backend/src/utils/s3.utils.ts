import AWS from 'aws-sdk';
import { AWSConfigAttributes } from '../constants/env.constants';

export const generatePresignedUrl = (fileName: string): Promise<{ preSignedUrl: string; bucketKey: string }> => {
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

  const bucketKey = `${Date.now()}-${fileName}`;
  const params = {
    Bucket: config.bucketName,
    Key: bucketKey,
    ContentType: 'image/jpeg',
    ACL: 'private',
    Expires: 3600, // Expiration time in seconds
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, (err, url) => {
      if (err) {
        console.error('Error generating pre-signed URL:', err);
        reject(new Error('Failed to generate pre-signed URL'));
      } else {
        resolve({ preSignedUrl: url, bucketKey });
      }
    });
  });
};
