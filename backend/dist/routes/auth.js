"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../services/user");
const router = (0, express_1.Router)();
exports.createUserRoutes = router;
router.post("/signup", user_1.createUser);
