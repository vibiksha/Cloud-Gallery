"use strict";
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
const s3_utils_1 = require("../utils/s3.utils");
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleFileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No file provided' });
    }
    const fileName = file.originalname;
    const contentType = file.mimetype; // Retrieve the content type
    const presignedUrl = yield (0, s3_utils_1.generatePresignedUrl)(fileName);
    try {
        yield axios_1.default.put(presignedUrl, file.buffer, {
            headers: {
                'Content-Type': contentType, // Use the retrieved content type
            },
        });
        const token = decodeJwtTokenFromHeaders(req);
        // const decoded=jwt.decode(token)
        console.log(token);
        console.log('Image uploaded successfully');
    }
    catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
});
exports.handleFileUpload = handleFileUpload;
function decodeJwtTokenFromHeaders(req) {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && typeof authorizationHeader === 'string') {
        const [bearer, token] = authorizationHeader.split(' ');
        if (bearer === 'Bearer' && token) {
            try {
                const decoded = jsonwebtoken_1.default.decode(token);
                return decoded;
            }
            catch (error) {
                console.error('Error decoding token:', error);
                return null;
            }
        }
    }
    return null;
}
