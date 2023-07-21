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
exports.setUserPassword = exports.createCognitoUser = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const env_constants_1 = require("../constants/env.constants");
const cognito = new aws_sdk_1.default.CognitoIdentityServiceProvider();
const createCognitoUser = (username, email, phoneNumber, password, uid) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        UserPoolId: env_constants_1.USER_POOL_ID,
        Username: email,
        TemporaryPassword: password,
        UserAttributes: [
            {
                Name: 'email',
                Value: email,
            },
            {
                Name: 'email_verified',
                Value: 'true',
            },
            //   {
            //     Name: 'phone_number',
            //     Value: `+91${phoneNumber}`,
            //   },
            {
                Name: 'preferred_username',
                Value: uid,
            },
        ],
    };
    try {
        const data = yield cognito.adminCreateUser(params).promise();
        (0, exports.setUserPassword)(email, password);
        console.log('User created successfully:', data);
        return data;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
});
exports.createCognitoUser = createCognitoUser;
const setUserPassword = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        UserPoolId: env_constants_1.USER_POOL_ID,
        Username: username,
        Password: password,
        Permanent: true, // Set this to 'true' if you want to set a permanent password
    };
    try {
        const data = yield cognito.adminSetUserPassword(params).promise();
        console.log('User password set successfully:', data);
        return data;
    }
    catch (error) {
        console.error('Error setting user password:', error);
        throw error;
    }
});
exports.setUserPassword = setUserPassword;
