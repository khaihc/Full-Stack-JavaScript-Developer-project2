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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var productService_1 = require("../../services/productService");
var dotenv_1 = __importDefault(require("dotenv"));
var responseService_1 = require("../../services/responseService");
var authentication_1 = __importDefault(require("../../middleware/authentication"));
dotenv_1["default"].config();
var productRoute = express_1["default"].Router();
var productService = new productService_1.ProductService();
var serect = String(process.env.SECRET_TOKEN);
// Get All Products from Database
productRoute.get("/", authentication_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, productService.fetchAllProducts()];
            case 1:
                products = _a.sent();
                (0, responseService_1.sendResponse)(res, 200, "Get list of product successfully", products);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                (0, responseService_1.sendResponse)(res, 500, "Failed to retrieve product: ".concat(error_1 instanceof Error ? error_1.message : 'Unknown error'));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Fetch Information for a Single Product
productRoute.get("/:id", authentication_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, product, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userId = parseInt(req.params.id);
                if (!!isNaN(userId)) return [3 /*break*/, 2];
                return [4 /*yield*/, productService.fetchProductInformation(userId)];
            case 1:
                product = _a.sent();
                (0, responseService_1.sendResponse)(res, 200, "Successfully retrieved product information.", product);
                return [3 /*break*/, 3];
            case 2:
                (0, responseService_1.sendResponse)(res, 400, "Invalid userId: product id must be a number");
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error("Error fetching product:", error_2);
                (0, responseService_1.sendResponse)(res, 500, "Failed to retrieve product: ".concat(error_2 instanceof Error ? error_2.message : 'Unknown error'));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Save Product
productRoute.post("/registerProduct", authentication_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, signUpUser, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                newUser = {
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.category
                };
                console.log(newUser);
                if (!(newUser.name && newUser.price && newUser.category)) return [3 /*break*/, 2];
                return [4 /*yield*/, productService.saveProduct(newUser)];
            case 1:
                signUpUser = _a.sent();
                (0, responseService_1.sendResponse)(res, 200, "Register user successfully", signUpUser);
                return [3 /*break*/, 3];
            case 2:
                (0, responseService_1.sendResponse)(res, 400, "Please input username, password, firstname, lastname");
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.error("Error during register user:", error_3);
                (0, responseService_1.sendResponse)(res, 422, "Failed to register user: ".concat(error_3 instanceof Error ? error_3.message : 'Unknown error'));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Updater Product
productRoute.put("/:id", authentication_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prId, updatedData, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                prId = parseInt(req.params.id);
                updatedData = req.body;
                return [4 /*yield*/, productService.updateProduct(prId, updatedData)];
            case 1:
                result = _a.sent();
                (0, responseService_1.sendResponse)(res, 200, result.message, result.data);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error("Error during user update:", error_4);
                (0, responseService_1.sendResponse)(res, 422, "Failed to update user: ".concat(error_4 instanceof Error ? error_4.message : 'Unknown error'));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Delete Product
productRoute["delete"]("/:id", authentication_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prId, message, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                prId = parseInt(req.params.id);
                return [4 /*yield*/, productService.deleteProduct(prId)];
            case 1:
                message = _a.sent();
                (0, responseService_1.sendResponse)(res, 200, message);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error("Error during user deletion:", error_5);
                (0, responseService_1.sendResponse)(res, 422, "Failed to delete user: ".concat(error_5 instanceof Error ? error_5.message : 'Unknown error'));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
productRoute.get("/category/:category", authentication_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var category, products, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                category = req.params.category;
                return [4 /*yield*/, productService.getProductsByCategory(category)];
            case 1:
                products = _a.sent();
                if (products.length === 0) {
                    return [2 /*return*/, (0, responseService_1.sendResponse)(res, 404, "No products found for this category.")];
                }
                (0, responseService_1.sendResponse)(res, 200, "Products retrieved successfully.", products);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error("Error during fetching products by category:", error_6);
                (0, responseService_1.sendResponse)(res, 422, "Failed to fetch products: ".concat(error_6 instanceof Error ? error_6.message : 'Unknown error'));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports["default"] = productRoute;
