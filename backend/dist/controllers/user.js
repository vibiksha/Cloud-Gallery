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
exports.createUser = void 0;
const user_1 = require("../models/user");
const cognito_utils_1 = require("../utils/cognito.utils");
const uuid_1 = require("uuid");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = (0, uuid_1.v4)();
    try {
        const newUser = new user_1.User();
        newUser.uid = uid;
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.phoneNumber = req.body.phoneNumber;
        const user = yield newUser.save();
        yield (0, cognito_utils_1.createCognitoUser)(newUser.username, newUser.email, newUser.phoneNumber, req.body.password, newUser.uid);
        return res.status(200).json({
            message: "User created successfully",
            data: user,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Error creating user" });
    }
});
exports.createUser = createUser;
