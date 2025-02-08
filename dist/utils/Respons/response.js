"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const success_response_1 = require("@utils/Respons/success-response");
const error_response_1 = require("@utils/Respons/error-response");
const sendResponse = (res, statusCode, message, data) => {
    if (statusCode === 200 || statusCode === 201) {
        (0, success_response_1.sendSuccessResponse)(res, data, statusCode, message);
    }
    else {
        (0, error_response_1.sendErrorResponse)(res, statusCode, message);
    }
};
exports.sendResponse = sendResponse;
