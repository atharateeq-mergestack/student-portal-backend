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
exports.comparePasswords = exports.findByEmail = exports.deleteUser = exports.updateUser = exports.getUserInfo = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("@models/User"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.default(userData);
    yield user.save();
    return (0, exports.getUserById)(user.id);
});
exports.createUser = createUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.find({}, { password: 0 }).exec();
});
exports.getUsers = getUsers;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findById(userId, { password: 0 }).exec();
});
exports.getUserById = getUserById;
const getUserInfo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findById(userId, { password: 0 }).exec();
});
exports.getUserInfo = getUserInfo;
const updateUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    delete userData.password;
    return yield User_1.default.findByIdAndUpdate(userId, userData, { new: true, runValidators: true, projection: { password: 0 } });
});
exports.updateUser = updateUser;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.findByIdAndDelete(userId).exec();
});
exports.deleteUser = deleteUser;
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findOne({ email }).exec();
});
exports.findByEmail = findByEmail;
const comparePasswords = (enteredPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(enteredPassword, hashedPassword);
});
exports.comparePasswords = comparePasswords;
