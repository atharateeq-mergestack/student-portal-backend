"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = void 0;
const sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.sendErrorResponse = sendErrorResponse;
