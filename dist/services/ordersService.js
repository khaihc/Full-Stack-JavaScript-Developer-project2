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
exports.__esModule = true;
exports.OrderService = void 0;
var dbService_1 = require("./dbService");
var orderQueries_sql_1 = require("../queries/orderQueries.sql");
var OrderService = /** @class */ (function () {
    function OrderService() {
    }
    // Get all orders
    OrderService.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(orderQueries_sql_1.orderQueries.SELECT_ALL_ORDERS)];
                                    case 1:
                                        result = _a.sent();
                                        return [2 /*return*/, result.rows.length > 0 ? result.rows : []];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Create order
    OrderService.prototype.createOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(orderQueries_sql_1.orderQueries.INSERT_ORDER, [
                                            order.product_id,
                                            order.quantity,
                                            order.user_id,
                                            order.status,
                                        ])];
                                    case 1:
                                        result = _a.sent();
                                        if (result.rows.length > 0) {
                                            return [2 /*return*/, result.rows[0]];
                                        }
                                        else {
                                            throw new Error("Error when inserting data into the database.");
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
    // Get order by user_id
    OrderService.prototype.getOrdersByUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var results;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(orderQueries_sql_1.orderQueries.SELECT_ORDERS_BY_USER, [userId])];
                                    case 1:
                                        results = _a.sent();
                                        return [2 /*return*/, results.rows.length > 0 ? results.rows : []];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Get completed orders by user_id
    OrderService.prototype.getCompletedOrdersByUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var results;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(orderQueries_sql_1.orderQueries.SELECT_COMPLETED_ORDERS_BY_USER, [userId])];
                                    case 1:
                                        results = _a.sent();
                                        return [2 /*return*/, results.rows.length > 0 ? results.rows : []];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Update order status
    OrderService.prototype.updateStatusOfOrder = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(orderQueries_sql_1.orderQueries.UPDATE_ORDER_STATUS, [orderId])];
                                    case 1:
                                        result = _a.sent();
                                        if (result.rows.length > 0) {
                                            return [2 /*return*/, result.rows[0]];
                                        }
                                        else {
                                            throw new Error("Error when updating order status. Order ID may not exist.");
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
    OrderService.prototype.deleteOrder = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var existingOrder;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(orderQueries_sql_1.orderQueries.CHECK_ORDER_EXISTENCE, [orderId])];
                                    case 1:
                                        existingOrder = _a.sent();
                                        if (existingOrder.rows.length === 0) {
                                            throw new Error("Order with ID ".concat(orderId, " does not exist."));
                                        }
                                        // Delete order
                                        return [4 /*yield*/, connection.query(orderQueries_sql_1.orderQueries.DELETE_ORDER, [orderId])];
                                    case 2:
                                        // Delete order
                                        _a.sent();
                                        return [2 /*return*/, "Order with ID ".concat(orderId, " has been successfully deleted.")];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return OrderService;
}());
exports.OrderService = OrderService;
