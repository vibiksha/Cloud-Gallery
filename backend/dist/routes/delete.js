"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoutes = void 0;
const express_1 = __importDefault(require("express"));
const deleteobject_1 = require("../services/deleteobject");
const router = express_1.default.Router();
exports.deleteRoutes = router;
router.post('/', deleteobject_1.deleteObject);
