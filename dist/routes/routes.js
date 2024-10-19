"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var routers = express_1["default"].Router();
var productRoute_1 = __importDefault(require("./handle/productRoute"));
var userRoute_1 = __importDefault(require("./handle/userRoute"));
var orderRoute_1 = __importDefault(require("./handle/orderRoute"));
routers.get('/', function (req, res) {
    res.json({
        message: 'Project 2: Creating an API with PostgreSQL and Express',
        status: 'success',
        timestamp: new Date().toISOString()
    });
});
routers.use('/users', userRoute_1["default"]);
routers.use('/products', productRoute_1["default"]);
routers.use('/orders', orderRoute_1["default"]);
exports["default"] = routers;
