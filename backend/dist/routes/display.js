"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayRoutes = void 0;
const express_1 = __importDefault(require("express"));
const displayImages_1 = require("../services/displayImages");
const router = express_1.default.Router();
exports.displayRoutes = router;
router.get('/', displayImages_1.displayImages);
