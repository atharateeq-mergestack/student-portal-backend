"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEmptyResponse = void 0;
const response_1 = require("@utils/Respons/response");
const constants_1 = require("@utils/constants");
const message_1 = require("@utils/message");
const handleEmptyResponse = (res, data) => {
    if (!data || (Array.isArray(data) && data.length === 0) || (typeof data === 'object' && Object.keys(data).length === 0)) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.NOT_FOUND, message_1.MESSAGES.NO_RECORD);
    }
    else {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.OK, message_1.MESSAGES.RECORD_FETCHED_SUCCESSFULLY, data);
    }
};
exports.handleEmptyResponse = handleEmptyResponse;
