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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.ProductService = void 0;
var dbService_1 = require("./dbService");
var productQueries_sql_1 = require("../queries/productQueries.sql");
var ProductService = /** @class */ (function () {
    function ProductService() {
    }
    ProductService.prototype.fetchAllProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(productQueries_sql_1.productQueries.SELECT_ALL_PRODUCTS)];
                                    case 1:
                                        result = _a.sent();
                                        if (result.rows.length > 0) {
                                            return [2 /*return*/, result.rows];
                                        }
                                        else {
                                            throw new Error("No products found in the database.");
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype.fetchProductInformation = function (pr_id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(productQueries_sql_1.productQueries.SELECT_PRODUCT_BY_ID, [pr_id])];
                                    case 1:
                                        result = _a.sent();
                                        if (result.rows.length > 0) {
                                            return [2 /*return*/, result.rows];
                                        }
                                        else {
                                            throw new Error("Product with ID ".concat(pr_id, " does not exist."));
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype.saveProduct = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var rows, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(productQueries_sql_1.productQueries.CHECK_PRODUCT_EXISTENCE, [product.name])];
                                    case 1:
                                        rows = (_a.sent()).rows;
                                        if (rows[0].exists) {
                                            throw new Error("Product name already taken. Please choose another.");
                                        }
                                        return [4 /*yield*/, connection.query(productQueries_sql_1.productQueries.INSERT_PRODUCT, [product.name, product.price, product.category])];
                                    case 2:
                                        result = _a.sent();
                                        return [2 /*return*/, result.rows[0]];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype.deleteProduct = function (prId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var existingProduct;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(productQueries_sql_1.productQueries.SELECT_PRODUCT_BY_ID, [prId])];
                                    case 1:
                                        existingProduct = _a.sent();
                                        if (existingProduct.rows.length === 0) {
                                            throw new Error("Product not found. Unable to delete.");
                                        }
                                        // Delete the product
                                        return [4 /*yield*/, connection.query(productQueries_sql_1.productQueries.DELETE_PRODUCT, [prId])];
                                    case 2:
                                        // Delete the product
                                        _a.sent();
                                        return [2 /*return*/, "Product with ID ".concat(prId, " has been successfully deleted.")];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype.updateProduct = function (prId, updatedData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var existingProduct, setClause, sqlUpdate, values, result, updatedProduct;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(productQueries_sql_1.productQueries.SELECT_PRODUCT_BY_ID, [prId])];
                                    case 1:
                                        existingProduct = _a.sent();
                                        if (existingProduct.rows.length === 0) {
                                            throw new Error("Product not found. Update operation cannot be completed.");
                                        }
                                        setClause = Object.keys(updatedData).map(function (key, index) { return "".concat(key, " = $").concat(index + 1); }).join(", ");
                                        sqlUpdate = productQueries_sql_1.productQueries.UPDATE_PRODUCT(setClause);
                                        values = __spreadArray(__spreadArray([], Object.values(updatedData), true), [prId], false);
                                        return [4 /*yield*/, connection.query(sqlUpdate, values)];
                                    case 2:
                                        result = _a.sent();
                                        updatedProduct = result.rows[0];
                                        return [2 /*return*/, {
                                                data: updatedProduct,
                                                message: "Product with ID ".concat(prId, " has been successfully updated.")
                                            }];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype.getProductsByCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var rows;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(productQueries_sql_1.productQueries.SELECT_BY_CATEGORY, [category])];
                                    case 1:
                                        rows = (_a.sent()).rows;
                                        return [2 /*return*/, rows];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ProductService;
}());
exports.ProductService = ProductService;
