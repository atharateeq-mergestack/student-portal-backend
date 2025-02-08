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
exports.deleteCart = exports.updateCart = exports.getCartByProductId = exports.getCartById = exports.getCartsOfUser = exports.getCarts = exports.createCart = void 0;
const lodash_1 = require("lodash");
const cartService = __importStar(require("@services/cartService"));
const constants_1 = require("@utils/constants");
const message_1 = require("@utils/message");
const response_1 = require("@utils/Respons/response");
const handleErrorResponse_1 = __importDefault(require("@utils/Respons/handleErrorResponse"));
const handleEmptyResponse_1 = require("@utils/Respons/handleEmptyResponse");
const createCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cartService.createCart(req.userId, req.body.addInCart, req.body.productIdToDelete);
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.CREATED, message_1.MESSAGES.RECORD_ADDED_SUCCESSFULLY, cart);
    }
    catch (error) {
        (0, handleErrorResponse_1.default)(res, error);
    }
});
exports.createCart = createCart;
const getCarts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield cartService.getCarts();
        (0, handleEmptyResponse_1.handleEmptyResponse)(res, carts);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.getCarts = getCarts;
const getCartsOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield cartService.getCartForUser(req.userId);
        console.log(carts);
        (0, handleEmptyResponse_1.handleEmptyResponse)(res, carts);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.getCartsOfUser = getCartsOfUser;
const getCartById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cartService.getCartById(req.params.cartId);
        (0, handleEmptyResponse_1.handleEmptyResponse)(res, cart);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.getCartById = getCartById;
const getCartByProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cartService.getCartByProductId(req.params.categoryId);
        (0, handleEmptyResponse_1.handleEmptyResponse)(res, cart);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.getCartByProductId = getCartByProductId;
const updateCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartData = req.body;
        const cartId = req.params.cartId;
        // Check if cartData object is empty or contains null/undefined values
        if ((0, lodash_1.isEmpty)(cartData) || (0, lodash_1.some)(cartData, lodash_1.isNil)) {
            return (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.BAD_REQUEST, message_1.MESSAGES.EMPTY_RECORD);
        }
        const cart = yield cartService.updateCart(cartId, cartData);
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.OK, message_1.MESSAGES.RECORD_UPDATED_SUCCESSFULLY, cart);
    }
    catch (error) {
        (0, handleErrorResponse_1.default)(res, error);
    }
});
exports.updateCart = updateCart;
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartId = req.params.cartId;
        yield cartService.deleteCart(cartId);
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.OK, message_1.MESSAGES.RECORD_DELETED_SUCCESSFULLY, {});
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
});
exports.deleteCart = deleteCart;
