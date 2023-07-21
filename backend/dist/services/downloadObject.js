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
exports.downloadObject = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const env_constants_1 = require("../constants/env.constants");
const downloadObject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // AWS.config.update({
    //     region: AWSConfigAttributes.REGION,
    //     accessKeyId: AWSConfigAttributes.ACCESS_KEY_ID,
    //     secretAccessKey: AWSConfigAttributes.SECRET_ACCESS_KEY,
    //   });
    const s3 = new aws_sdk_1.default.S3();
    const params = { Bucket: env_constants_1.BUCKET_NAME, Key: req.body.key };
    s3.getObject(params, (err, data) => {
        var _a;
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching image');
        }
        res.writeHead(200, {
            'Content-Type': data.ContentType,
            'Content-Length': (_a = data === null || data === void 0 ? void 0 : data.ContentLength) === null || _a === void 0 ? void 0 : _a.toString(),
        });
        res.end(data.Body);
    });
});
exports.downloadObject = downloadObject;
