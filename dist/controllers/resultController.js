"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResult = exports.updateResult = exports.getResultById = exports.getResults = exports.createResult = void 0;
const resultService = __importStar(require("@services/resultService"));
const constants_1 = require("@utils/constants");
const message_1 = require("@utils/message");
const response_1 = require("@utils/Respons/response");
const handleErrorResponse_1 = __importDefault(require("@utils/Respons/handleErrorResponse"));
const handleEmptyResponse_1 = require("@utils/Respons/handleEmptyResponse");
const createResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultData = Object.assign(Object.assign({}, req.body), { createdBy: req.userId });
        const result = yield resultService.createResult(resultData);
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.CREATED, message_1.MESSAGES.RECORD_ADDED_SUCCESSFULLY, result);
    }
    catch (error) {
        (0, handleErrorResponse_1.default)(res, error);
    }
});
exports.createResult = createResult;
const getResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield resultService.getResults(req.userId);
        (0, handleEmptyResponse_1.handleEmptyResponse)(res, results);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.getResults = getResults;
const getResultById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield resultService.getResultById(req.params.resultId);
        (0, handleEmptyResponse_1.handleEmptyResponse)(res, result);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.getResultById = getResultById;
const updateResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultData = req.body;
        const resultId = req.params.resultId;
        const result = yield resultService.updateResult(resultId, resultData);
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.OK, message_1.MESSAGES.RECORD_UPDATED_SUCCESSFULLY, result);
    }
    catch (error) {
        (0, handleErrorResponse_1.default)(res, error);
    }
});
exports.updateResult = updateResult;
const deleteResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultId = req.params.resultId;
        yield resultService.deleteResult(resultId);
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.OK, message_1.MESSAGES.RECORD_DELETED_SUCCESSFULLY, {});
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.deleteResult = deleteResult;
