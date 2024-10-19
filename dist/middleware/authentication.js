"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var secret = String(process.env.SECRET_TOKEN);
var auth = function (req, res, next) {
    try {
        var token = req.headers.authorization;
        console.log('Authorization Header:', req.headers.authorization);
        if (token) {
            token = token.split(" ")[1];
            var user = jsonwebtoken_1["default"].verify(token, secret);
            next();
        }
        else {
            throw new Error("Invalid token");
        }
    }
    catch (error) {
        res.status(401).json({
            message: "Access denied! Invalid token" + error
        });
    }
};
exports["default"] = auth;
