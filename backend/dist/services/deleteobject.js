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
exports.deleteObject = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const delete_dao_1 = require("../dao/delete.dao");
const env_constants_1 = require("../constants/env.constants");
const deleteObject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.body.fileName;
    console.log(fileName);
    try {
        const s3 = new aws_sdk_1.default.S3();
        const params = {
            Bucket: env_constants_1.BUCKET_NAME,
            Key: fileName
        };
        yield s3.deleteObject(params).promise();
        yield (0, delete_dao_1.deleteFromDatabase)(fileName);
        res.status(200).json({ message: 'Object deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting object:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteObject = deleteObject;
