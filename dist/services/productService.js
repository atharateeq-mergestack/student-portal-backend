"use strict";
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
const Product_1 = __importDefault(require("@models/Product"));
const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new Product_1.default(productData);
    yield product.save();
    return (0, exports.getProductById)(product.id);
});
exports.createProduct = createProduct;
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.find({}).populate('categoryId').exec();
});
exports.getProducts = getProducts;
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.findById(productId).populate('categoryId').exec();
});
exports.getProductById = getProductById;
const getProductByCategoryId = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.find({ categoryId }).populate('categoryId').exec();
});
exports.getProductByCategoryId = getProductByCategoryId;
const updateProduct = (productId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.findByIdAndUpdate(productId, productData, { new: true, runValidators: true }).exec();
});
exports.updateProduct = updateProduct;
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    yield Product_1.default.findByIdAndDelete(productId).exec();
});
exports.deleteProduct = deleteProduct;
