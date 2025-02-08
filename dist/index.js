"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("module-alias/register");
const constants_1 = require("./utils/constants");
const userRoutes_1 = __importDefault(require("@routes/userRoutes"));
const connection_1 = require("@db/connection");
const authRoutes_1 = __importDefault(require("@routes/authRoutes"));
const cors_1 = __importDefault(require("cors"));
const subjectRoutes_1 = __importDefault(require("@routes/subjectRoutes"));
const resultRoutes_1 = __importDefault(require("@routes/resultRoutes"));
const categoryRoutes_1 = __importDefault(require("@routes/categoryRoutes"));
const productRoutes_1 = __importDefault(require("@routes/productRoutes"));
const cartRoutes_1 = __importDefault(require("@routes/cartRoutes"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(`${constants_1.API_PREFIX}/user`, userRoutes_1.default);
app.use(`${constants_1.API_PREFIX}/auth`, authRoutes_1.default);
app.use(`${constants_1.API_PREFIX}/subject`, subjectRoutes_1.default);
app.use(`${constants_1.API_PREFIX}/result`, resultRoutes_1.default);
app.use(`${constants_1.API_PREFIX}/category`, categoryRoutes_1.default);
app.use(`${constants_1.API_PREFIX}/product`, productRoutes_1.default);
app.use(`${constants_1.API_PREFIX}/cart`, cartRoutes_1.default);
app.use(`/`, (req, res) => {
    res.send('Welcome to the API');
});
(0, connection_1.connectToDatabase)().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
exports.default = app;
