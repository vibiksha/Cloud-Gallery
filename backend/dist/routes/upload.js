"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRoutes = void 0;
const express_1 = __importDefault(require("express"));
const upload_1 = require("../services/upload");
const router = express_1.default.Router();
exports.uploadRoutes = router;
router.post('/', upload_1.handleFileUpload);
