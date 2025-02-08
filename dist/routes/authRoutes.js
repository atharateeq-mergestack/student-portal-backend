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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userService_1 = require("@services/userService");
const constants_1 = require("@utils/constants");
const message_1 = require("@utils/message");
const validator = __importStar(require("@utils/helper/validationChecker"));
const response_1 = require("@utils/Respons/response");
const router = express_1.default.Router();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        return (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.BAD_REQUEST, `Email ${message_1.MESSAGES.IS_REQUIRED}`);
    }
    if (!password) {
        return (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.BAD_REQUEST, `Password ${message_1.MESSAGES.IS_REQUIRED}`);
    }
    if (!validator.isValidEmail(email)) {
        return (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.BAD_REQUEST, message_1.MESSAGES.EMAIL_FORMAT_INVALID);
    }
    try {
        const user = yield (0, userService_1.findByEmail)(email);
        if (!user) {
            return (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.NOT_FOUND, message_1.MESSAGES.ACCOUNT_NOT_EXISIT);
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.UNAUTHORIZED, message_1.MESSAGES.INCORRECT);
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, `${constants_1.SECRET_KEY}`, { expiresIn: constants_1.TOKEN_EXPIRES_IN });
        res.cookie('token', token);
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.OK, message_1.MESSAGES.LOGIN, token);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, message_1.MESSAGES.INTERNAL_SERVER_ERROR);
    }
}));
exports.default = router;
