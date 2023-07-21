"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePresignedUrl = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const env_constants_1 = require("../constants/env.constants");
const generatePresignedUrl = (fileName) => {
    const s3 = new aws_sdk_1.default.S3();
    const bucketKey = `${Date.now()}-${fileName}`;
    const params = {
        Bucket: env_constants_1.BUCKET_NAME,
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
