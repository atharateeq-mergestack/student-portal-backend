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
exports.getResults = exports.deleteResult = exports.updateResult = exports.getResultById = exports.createResult = void 0;
const Result_1 = __importDefault(require("@models/Result"));
const createResult = (resultData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = new Result_1.default(resultData);
    yield result.save();
    return (0, exports.getResultById)(result.id);
});
exports.createResult = createResult;
const getResultById = (resultId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Result_1.default.findById(resultId)
        .populate('subjectId', 'subjectName')
        .exec();
});
exports.getResultById = getResultById;
const updateResult = (resultId, resultData) => __awaiter(void 0, void 0, void 0, function* () {
    yield Result_1.default.findByIdAndUpdate(resultId, resultData, { new: true, runValidators: true }).exec();
    return (0, exports.getResultById)(resultId);
});
exports.updateResult = updateResult;
const deleteResult = (resultId) => __awaiter(void 0, void 0, void 0, function* () {
    yield Result_1.default.findByIdAndDelete(resultId).exec();
});
exports.deleteResult = deleteResult;
const getResults = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield Result_1.default.find({ createdBy: userId })
        .populate('subjectId', 'subjectName')
        .exec();
    return results;
});
exports.getResults = getResults;
