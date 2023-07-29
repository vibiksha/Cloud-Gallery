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
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const upload_1 = require("./routes/upload");
const display_1 = require("./routes/display");
const delete_1 = require("./routes/delete");
const download_1 = require("./routes/download");
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Max-Age', '3600');
        res.status(204).end();
        return;
    }
    next();
});
app.options('*', (0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.get('/', (req, res) => {
    res.send('hii');
});
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
