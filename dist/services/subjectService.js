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
exports.deleteSubject = exports.updateSubject = exports.getSubjectById = exports.getSubjects = exports.createSubject = void 0;
const Subject_1 = __importDefault(require("@models/Subject"));
const createSubject = (subjectData) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = new Subject_1.default(subjectData);
    yield subject.save();
    return (0, exports.getSubjectById)(subject.id);
});
exports.createSubject = createSubject;
const getSubjects = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Subject_1.default.find({}).exec();
});
exports.getSubjects = getSubjects;
const getSubjectById = (subjectId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Subject_1.default.findById(subjectId).exec();
});
exports.getSubjectById = getSubjectById;
const updateSubject = (subjectId, subjectData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Subject_1.default.findByIdAndUpdate(subjectId, subjectData, { new: true, runValidators: true }).exec();
});
exports.updateSubject = updateSubject;
const deleteSubject = (subjectId) => __awaiter(void 0, void 0, void 0, function* () {
    yield Subject_1.default.findByIdAndDelete(subjectId).exec();
});
exports.deleteSubject = deleteSubject;
