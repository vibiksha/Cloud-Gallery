import AWS from 'aws-sdk';
import { BUCKET_NAME } from '../constants/env.constants';

export const generatePresignedUrl = (fileName: string): Promise<{ preSignedUrl: string; bucketKey: string }> => {

  const s3 = new AWS.S3();

  const bucketKey = `${Date.now()}-${fileName}`;
  const params = {
    Bucket:  BUCKET_NAME,
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
