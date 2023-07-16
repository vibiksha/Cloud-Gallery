"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./db/config"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const auth_1 = require("./routes/auth");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const env_constants_1 = require("./constants/env.constants");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const upload_1 = require("./routes/upload");
const display_1 = require("./routes/display");
const delete_1 = require("./routes/delete");
const download_1 = require("./routes/download");
// Configure AWS SDK
aws_sdk_1.default.config.update({
    region: env_constants_1.AWSConfigAttributes.REGION,
    accessKeyId: env_constants_1.AWSConfigAttributes.ACCESS_KEY_ID,
    secretAccessKey: env_constants_1.AWSConfigAttributes.SECRET_ACCESS_KEY,
});
const s3 = new aws_sdk_1.default.S3();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials if required
    // Add more specific headers if needed
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Max-Age', '3600'); // Set max age for preflight requests
        res.status(204).end();
        return;
    }
    next();
});
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/auth", auth_1.createUserRoutes);
app.use('/upload', upload_1.uploadRoutes);
app.use('/display', display_1.displayRoutes);
app.use('/delete', delete_1.deleteRoutes);
app.use('/download', download_1.downloadRoutes);
config_1.default.sync()
    .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
})
    .catch((err) => {
    console.log("Connection problem:", err);
});
