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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const message_1 = require("@utils/message");
const enum_1 = require("@utils/enum");
const ResultSchema = new mongoose_1.Schema({
    studentName: {
        type: String,
        required: [true, `Student name${message_1.MESSAGES.IS_REQUIRED}`],
        validate: {
            validator: (value) => /^[a-zA-Z\s]+$/.test(value),
            message: `Student name${message_1.MESSAGES.ONLY_ALPHABETIC}`
        }
    },
    subjectId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Subject',
        required: [true, `Subject ID${message_1.MESSAGES.IS_REQUIRED}`]
    },
    marks: {
        type: Number,
        required: [true, `Marks${message_1.MESSAGES.IS_REQUIRED}`],
        min: [0, message_1.MESSAGES.MARKS_RANGE],
        max: [100, message_1.MESSAGES.MARKS_RANGE]
    },
    grade: {
        type: String,
        required: [true, `Grade${message_1.MESSAGES.IS_REQUIRED}`],
        enum: {
            values: Object.values(enum_1.Grade),
            message: `Grade must be one of ${Object.values(enum_1.Grade).join(', ')}`
        },
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, `Created by${message_1.MESSAGES.IS_REQUIRED}`]
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Result', ResultSchema);
