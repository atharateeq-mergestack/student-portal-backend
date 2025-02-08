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
exports.deleteCategory = exports.updateCategory = exports.getCategoryByUserId = exports.getCategoryById = exports.getCategorys = exports.createCategory = void 0;
const Category_1 = __importDefault(require("@models/Category"));
const createCategory = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    const category = new Category_1.default(categoryData);
    yield category.save();
    return (0, exports.getCategoryById)(category.id);
});
exports.createCategory = createCategory;
const getCategorys = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Category_1.default.find({}).exec();
});
exports.getCategorys = getCategorys;
const getCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Category_1.default.findById(categoryId).exec();
});
exports.getCategoryById = getCategoryById;
const getCategoryByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Category_1.default.find({ userId }).exec();
});
exports.getCategoryByUserId = getCategoryByUserId;
const updateCategory = (categoryId, categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Category_1.default.findByIdAndUpdate(categoryId, categoryData, { new: true, runValidators: true }).exec();
});
exports.updateCategory = updateCategory;
const deleteCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    yield Category_1.default.findByIdAndDelete(categoryId).exec();
});
exports.deleteCategory = deleteCategory;
