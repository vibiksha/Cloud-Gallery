"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFileUpload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uploadDao = __importStar(require("../dao/upload.dao"));
const env_constants_1 = require("../constants/env.constants");
const decodeToken_1 = require("./decodeToken");
const handleFileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.body.fileName;
    const s3 = new aws_sdk_1.default.S3();
    const params = {
        Bucket: env_constants_1.BUCKET_NAME,
        Key: `${Date.now()}-${fileName}`,
        ContentType: 'image/jpeg',
        ACL: 'private',
        Expires: 3600, // Expiration time in seconds
    };
    // Generate the pre-signed URL
    s3.getSignedUrl('putObject', params, (err, url) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error('Error generating pre-signed URL:', err);
            return res.status(500).json({ error: 'Failed to generate pre-signed URL' });
        }
        const token = req.headers.authorization;
        const decodedToken = (0, decodeToken_1.decodeJwtTokenFromHeaders)(token);
        if (decodedToken && decodedToken.preferred_username) {
            const bucketKey = params.Key;
            try {
                yield uploadDao.upload(decodedToken.preferred_username, bucketKey);
            }
            catch (error) {
                console.error('Error inserting bucket key into database:', error);
                return res.status(500).json({ error: 'Failed to insert bucket key into database' });
            }
        }
        // Return the pre-signed URL to the client
        res.json({ preSignedUrl: url, bucketKey: params.Key });
    }));
});
exports.handleFileUpload = handleFileUpload;
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
