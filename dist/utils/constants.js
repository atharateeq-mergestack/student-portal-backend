"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_EXPIRES_IN = exports.SECRET_KEY = exports.HTTP_STATUS = exports.API_PREFIX = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.API_PREFIX = '/api';
exports.HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
};
exports.SECRET_KEY = process.env.SECRET_KEY;
exports.TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;
