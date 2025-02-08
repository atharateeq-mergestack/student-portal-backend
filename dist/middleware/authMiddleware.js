"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = require("lodash");
const constants_1 = require("@utils/constants");
const message_1 = require("@utils/message");
const response_1 = require("@utils/Respons/response");
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.UNAUTHORIZED, message_1.MESSAGES.UNAUTHORIZED);
    }
    const token = (0, lodash_1.split)(authHeader, ' ')[1];
    if ((0, lodash_1.isEmpty)(token)) {
        return (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.UNAUTHORIZED, message_1.MESSAGES.UNAUTHORIZED);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, `${constants_1.SECRET_KEY}`);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.FORBIDDEN, message_1.MESSAGES.FORBIDDEN);
    }
};
exports.authenticateUser = authenticateUser;
