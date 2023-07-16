"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJwtTokenFromHeaders = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function decodeJwtTokenFromHeaders(authorizationHeader) {
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
exports.decodeJwtTokenFromHeaders = decodeJwtTokenFromHeaders;
