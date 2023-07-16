"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUpload = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user"); // Assuming you have a User model defined
let imageUpload = exports.imageUpload = class imageUpload extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: sequelize_typescript_1.DataType.INTEGER,
    })
], imageUpload.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User),
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_typescript_1.DataType.STRING,
    })
], imageUpload.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_typescript_1.DataType.STRING,
    })
], imageUpload.prototype, "key", void 0);
exports.imageUpload = imageUpload = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: "imageUpload",
    })
], imageUpload);
