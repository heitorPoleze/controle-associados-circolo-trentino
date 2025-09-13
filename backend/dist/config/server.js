"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// @ts-ignore
const consign_1 = __importDefault(require("consign"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.set("view engine", "ejs");
exports.app.set("views", path_1.default.join(__dirname, "../views"));
(0, consign_1.default)().include("src/routes").then("src/config/sql.ts").into(exports.app);
//# sourceMappingURL=server.js.map