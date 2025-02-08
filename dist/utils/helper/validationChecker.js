"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStrongPassword = exports.isValidEmail = exports.isAlphaNumericWithSpecial = exports.isAlphaNumeric = exports.isAlphabetic = void 0;
const isAlphabetic = (value) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(value);
};
exports.isAlphabetic = isAlphabetic;
const isAlphaNumeric = (value) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(value);
};
exports.isAlphaNumeric = isAlphaNumeric;
const isAlphaNumericWithSpecial = (value) => {
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-\s]*$/;
    return regex.test(value);
};
exports.isAlphaNumericWithSpecial = isAlphaNumericWithSpecial;
const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
exports.isValidEmail = isValidEmail;
const isStrongPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};
exports.isStrongPassword = isStrongPassword;
