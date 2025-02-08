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
exports.deleteProduct = exports.updateProduct = exports.getProductByCategoryId = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const lodash_1 = require("lodash");
const productService = __importStar(require("@services/productService"));
const constants_1 = require("@utils/constants");
const message_1 = require("@utils/message");
const response_1 = require("@utils/Respons/response");
const handleErrorResponse_1 = __importDefault(require("@utils/Respons/handleErrorResponse"));
const handleEmptyResponse_1 = require("@utils/Respons/handleEmptyResponse");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productService.createProduct(req.body);
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.CREATED, message_1.MESSAGES.RECORD_ADDED_SUCCESSFULLY, product);
    }
    catch (error) {
        (0, handleErrorResponse_1.default)(res, error);
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productService.getProducts();
        (0, handleEmptyResponse_1.handleEmptyResponse)(res, products);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productService.getProductById(req.params.productId);
        (0, handleEmptyResponse_1.handleEmptyResponse)(res, product);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.getProductById = getProductById;
const getProductByCategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productService.getProductByCategoryId(req.params.categoryId);
        (0, handleEmptyResponse_1.handleEmptyResponse)(res, product);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.getProductByCategoryId = getProductByCategoryId;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const productId = req.params.productId;
        // Check if productData object is empty or contains null/undefined values
        if ((0, lodash_1.isEmpty)(productData) || (0, lodash_1.some)(productData, lodash_1.isNil)) {
            return (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.BAD_REQUEST, message_1.MESSAGES.EMPTY_RECORD);
        }
        const product = yield productService.updateProduct(productId, productData);
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.OK, message_1.MESSAGES.RECORD_UPDATED_SUCCESSFULLY, product);
    }
    catch (error) {
        (0, handleErrorResponse_1.default)(res, error);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        yield productService.deleteProduct(productId);
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.OK, message_1.MESSAGES.RECORD_DELETED_SUCCESSFULLY, {});
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.deleteProduct = deleteProduct;
