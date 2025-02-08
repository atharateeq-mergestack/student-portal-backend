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
const ProductSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, `Product name${message_1.MESSAGES.IS_REQUIRED}`],
    },
    productDescription: {
        type: String,
        required: [true, `Product description${message_1.MESSAGES.IS_REQUIRED}`],
    },
    productImage: {
        type: String,
        required: [true, `Product image${message_1.MESSAGES.IS_REQUIRED}`]
    },
    price: {
        type: Number,
        required: [true, `Product price${message_1.MESSAGES.IS_REQUIRED}`],
        min: [0, `Product price must be a positive number`]
    },
    quantity: {
        type: Number,
        required: [true, `Product quantity${message_1.MESSAGES.IS_REQUIRED}`],
        min: [0, `Product quantity cannot be less than zero`]
    },
    discount: {
        type: Number,
        validate: {
            validator: (value) => value >= 0 && value <= 100,
            message: `Discount must be between 0 and 100`
        }
    },
    categoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, `Category ID${message_1.MESSAGES.IS_REQUIRED}`],
        ref: 'Category'
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Product', ProductSchema);
