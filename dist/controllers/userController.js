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
exports.deleteUser = exports.updateUser = exports.getUserInfo = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const lodash_1 = require("lodash");
const userService = __importStar(require("@services/userService"));
const constants_1 = require("@utils/constants");
const message_1 = require("@utils/message");
const response_1 = require("@utils/Respons/response");
const handleEmptyResponse_1 = require("@utils/Respons/handleEmptyResponse");
const handleErrorResponse_1 = __importDefault(require("@utils/Respons/handleErrorResponse"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user with the same email already exists
        const existingUser = yield userService.findByEmail(req.body.email);
        if (existingUser) {
            return (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.BAD_REQUEST, message_1.MESSAGES.USER_EMAIL_EXISTS);
        }
        // Create user
        const user = yield userService.createUser(req.body);
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.CREATED, message_1.MESSAGES.SIGNUP_SUCCESSFULLY, user);
    }
    catch (error) {
        (0, handleErrorResponse_1.default)(res, error);
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getUsers();
        (0, handleEmptyResponse_1.handleEmptyResponse)(res, users);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getUserById(req.params.userId);
        (0, handleEmptyResponse_1.handleEmptyResponse)(res, user);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.getUserById = getUserById;
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getUserInfo(req.userId);
        (0, handleEmptyResponse_1.handleEmptyResponse)(res, user);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.getUserInfo = getUserInfo;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const userId = req.params.id;
        // Check if userData object is empty or contains null/undefined values
        if ((0, lodash_1.isEmpty)(userData) || (0, lodash_1.some)(userData, lodash_1.isNil)) {
            return (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.BAD_REQUEST, message_1.MESSAGES.EMPTY_RECORD);
        }
        // Check if user with the same email already exists
        if (userData.email) {
            const existingUser = yield userService.findByEmail(userData.email);
            if (existingUser) {
                return (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.BAD_REQUEST, message_1.MESSAGES.USER_EMAIL_EXISTS);
            }
        }
        const user = yield userService.updateUser(userId, userData);
        (0, handleEmptyResponse_1.handleEmptyResponse)(res, user);
    }
    catch (error) {
        (0, handleErrorResponse_1.default)(res, error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        yield userService.deleteUser(userId);
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.OK, message_1.MESSAGES.RECORD_DELETED_SUCCESSFULLY, {});
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.deleteUser = deleteUser;
