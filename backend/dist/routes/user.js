"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../controllers/upload");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.post("/signup", user_1.createUser);
router.post('/', upload_1.handleFileUpload);
exports.default = router;
