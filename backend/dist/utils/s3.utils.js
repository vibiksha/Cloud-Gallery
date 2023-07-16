"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePresignedUrl = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const env_constants_1 = require("../constants/env.constants");
const generatePresignedUrl = (fileName) => {
    const config = {
        bucketName: 'aws-image-gallery-project',
        region: env_constants_1.AWSConfigAttributes.REGION,
        accessKeyId: env_constants_1.AWSConfigAttributes.ACCESS_KEY_ID,
        secretAccessKey: env_constants_1.AWSConfigAttributes.SECRET_ACCESS_KEY,
    };
    const s3 = new aws_sdk_1.default.S3({
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
            }
            else {
                resolve({ preSignedUrl: url, bucketKey });
            }
        });
    });
};
exports.generatePresignedUrl = generatePresignedUrl;
