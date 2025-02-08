"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const response_1 = require("@utils/Respons/response");
const constants_1 = require("@utils/constants");
const message_1 = require("@utils/message");
const handleErrorResponse = (res, error) => {
    if (error instanceof mongoose_1.default.Error.ValidationError) {
        const errors = Object.values(error.errors).map((err) => err.message);
        return (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.BAD_REQUEST, errors);
    }
    else {
        return (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
};
exports.default = handleErrorResponse;
