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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const validator = __importStar(require("@utils/helper/validationChecker"));
const hash_1 = require("@utils/helper/hash");
const message_1 = require("@utils/message");
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, `First name${message_1.MESSAGES.IS_REQUIRED}`],
        validate: [validator.isAlphabetic, `First name${message_1.MESSAGES.ONLY_ALPHABETIC}`]
    },
    lastName: {
        type: String,
        required: [true, `Last name${message_1.MESSAGES.IS_REQUIRED}`],
        validate: [validator.isAlphabetic, `Last name${message_1.MESSAGES.ONLY_ALPHABETIC}`]
    },
    userName: {
        type: String,
        required: [true, `User name${message_1.MESSAGES.IS_REQUIRED}`],
        validate: [validator.isAlphaNumeric, `User name${message_1.MESSAGES.ONLY_ALPHANUMERIC}`]
    },
    email: {
        type: String,
        required: [true, `Email${message_1.MESSAGES.IS_REQUIRED}`],
        unique: true,
        validate: [validator.isValidEmail, message_1.MESSAGES.EMAIL_FORMAT_INVALID]
    },
    password: {
        type: String,
        required: [true, `Password${message_1.MESSAGES.IS_REQUIRED}`],
        validate: [validator.isStrongPassword, message_1.MESSAGES.PASSWORD_COMPLEXITY]
    },
});
// Hash password before saving
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password'))
            return next();
        try {
            const hashedPassword = yield (0, hash_1.hashingPassword)(user.password);
            user.password = hashedPassword;
            return next();
        }
        catch (error) {
            return next();
        }
    });
});
exports.default = mongoose_1.default.model('User', UserSchema);
