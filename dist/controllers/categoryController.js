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
exports.deleteCategory = exports.updateCategory = exports.getCategoryByUserId = exports.getCategoryById = exports.getCategorys = exports.createCategory = void 0;
const lodash_1 = require("lodash");
const categoryService = __importStar(require("@services/categoryService"));
const constants_1 = require("@utils/constants");
const message_1 = require("@utils/message");
const response_1 = require("@utils/Respons/response");
const handleErrorResponse_1 = __importDefault(require("@utils/Respons/handleErrorResponse"));
const handleEmptyResponse_1 = require("@utils/Respons/handleEmptyResponse");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryService.createCategory(req.body);
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.CREATED, message_1.MESSAGES.RECORD_ADDED_SUCCESSFULLY, category);
    }
    catch (error) {
        (0, handleErrorResponse_1.default)(res, error);
    }
});
exports.createCategory = createCategory;
const getCategorys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorys = yield categoryService.getCategorys();
        (0, handleEmptyResponse_1.handleEmptyResponse)(res, categorys);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.getCategorys = getCategorys;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryService.getCategoryById(req.params.categoryId);
        (0, handleEmptyResponse_1.handleEmptyResponse)(res, category);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.getCategoryById = getCategoryById;
const getCategoryByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryService.getCategoryByUserId(req.params.userId);
        (0, handleEmptyResponse_1.handleEmptyResponse)(res, category);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.getCategoryByUserId = getCategoryByUserId;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryData = req.body;
        const categoryId = req.params.categoryId;
        // Check if categoryData object is empty or contains null/undefined values
        if ((0, lodash_1.isEmpty)(categoryData) || (0, lodash_1.some)(categoryData, lodash_1.isNil)) {
            return (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.BAD_REQUEST, message_1.MESSAGES.EMPTY_RECORD);
        }
        const category = yield categoryService.updateCategory(categoryId, categoryData);
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.OK, message_1.MESSAGES.RECORD_UPDATED_SUCCESSFULLY, category);
    }
    catch (error) {
        (0, handleErrorResponse_1.default)(res, error);
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        yield categoryService.deleteCategory(categoryId);
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.OK, message_1.MESSAGES.RECORD_DELETED_SUCCESSFULLY, {});
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.deleteCategory = deleteCategory;
