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
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayImages = void 0;
const imageUpload_1 = require("../models/imageUpload");
const decodeToken_1 = require("./decodeToken");
const displayImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const decodedToken = (0, decodeToken_1.decodeJwtTokenFromHeaders)(token);
        // Decode the token to retrieve the preferred username
        const userId = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.preferred_username;
        if (!userId) {
            return res.status(401).json({ error: 'Invalid token or missing preferred username' });
        }
        // Retrieve all keys for the preferred username using the Sequelize model
        const keys = yield imageUpload_1.imageUpload.findAll({
            where: {
                userId: userId,
            },
            attributes: ['key'],
        });
        const extractedKeys = keys.map((image) => image.key);
        res.json(extractedKeys);
    }
    catch (error) {
        console.error('Error retrieving keys:', error);
        res.status(500).json({ error: 'Failed to retrieve keys' });
    }
});
exports.displayImages = displayImages;
