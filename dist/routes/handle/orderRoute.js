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
var ordersService_1 = require("../../services/ordersService");
var responseService_1 = require("../../services/responseService");
var authentication_1 = __importDefault(require("../../middleware/authentication"));
var orderRoute = express_1["default"].Router();
var orderService = new ordersService_1.OrderService();
// Get all orders
orderRoute.get("/", authentication_1["default"], function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderService.index()];
            case 1:
                orders = _a.sent();
                (0, responseService_1.sendResponse)(res, 200, "Retrieved the list of orders successfully.", orders);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Error fetching orders:", error_1);
                (0, responseService_1.sendResponse)(res, 500, "An error occurred while fetching orders.");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get order by user_id
orderRoute.get("/user/:userId", authentication_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, orders, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userId = parseInt(req.params.userId, 10);
                if (!!isNaN(userId)) return [3 /*break*/, 2];
                return [4 /*yield*/, orderService.getOrdersByUser(userId)];
            case 1:
                orders = _a.sent();
                (0, responseService_1.sendResponse)(res, 200, "Retrieved orders for user successfully.", orders);
                return [3 /*break*/, 3];
            case 2:
                (0, responseService_1.sendResponse)(res, 400, "Invalid user ID. Please provide a numeric ID.");
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error("Error fetching orders by user:", error_2);
                (0, responseService_1.sendResponse)(res, 500, "Failed to retrieve orders: ".concat(error_2 instanceof Error ? error_2.message : 'Unknown error'));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Get orders complete by user_id
orderRoute.get("/user/:userId/order", authentication_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, orders, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userId = parseInt(req.params.userId, 10);
                if (!!isNaN(userId)) return [3 /*break*/, 2];
                return [4 /*yield*/, orderService.getCompletedOrdersByUser(userId)];
            case 1:
                orders = _a.sent();
                (0, responseService_1.sendResponse)(res, 200, "Retrieved completed orders for user successfully.", orders);
                return [3 /*break*/, 3];
            case 2:
                (0, responseService_1.sendResponse)(res, 400, "Invalid user ID. Please provide a numeric ID.");
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.error("Error fetching completed orders by user:", error_3);
                (0, responseService_1.sendResponse)(res, 500, "Failed to retrieve completed orders: ".concat(error_3 instanceof Error ? error_3.message : 'Unknown error'));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Create new order
orderRoute.post("/", authentication_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newOrder, createdOrder, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                newOrder = {
                    product_id: parseInt(req.body.product_id, 10),
                    user_id: parseInt(req.body.user_id, 10),
                    quantity: req.body.quantity,
                    status: 'active'
                };
                if (!(newOrder.product_id && newOrder.user_id && newOrder.quantity)) return [3 /*break*/, 2];
                if (newOrder.quantity <= 0) {
                    return [2 /*return*/, (0, responseService_1.sendResponse)(res, 400, "Quantity must be a positive number.")];
                }
                return [4 /*yield*/, orderService.createOrder(newOrder)];
            case 1:
                createdOrder = _a.sent();
                (0, responseService_1.sendResponse)(res, 201, "Order created successfully.", createdOrder);
                return [3 /*break*/, 3];
            case 2:
                (0, responseService_1.sendResponse)(res, 400, "Please provide valid product ID, user ID, and quantity.");
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.error("Error during order creation:", error_4);
                (0, responseService_1.sendResponse)(res, 422, "Failed to create order: ".concat(error_4 instanceof Error ? error_4.message : 'Unknown error'));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Update order status
orderRoute.put("/:id", authentication_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, updatedOrder, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                orderId = parseInt(req.params.id, 10);
                if (!!isNaN(orderId)) return [3 /*break*/, 2];
                return [4 /*yield*/, orderService.updateStatusOfOrder(orderId)];
            case 1:
                updatedOrder = _a.sent();
                (0, responseService_1.sendResponse)(res, 200, "Order status updated to complete successfully.", updatedOrder);
                return [3 /*break*/, 3];
            case 2:
                (0, responseService_1.sendResponse)(res, 400, "Invalid order ID. Please provide a numeric ID.");
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.error("Error during order update:", error_5);
                (0, responseService_1.sendResponse)(res, 422, "Failed to update order: ".concat(error_5 instanceof Error ? error_5.message : 'Unknown error'));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Delete order
orderRoute["delete"]("/:id", authentication_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, message, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                orderId = parseInt(req.params.id, 10);
                if (!!isNaN(orderId)) return [3 /*break*/, 2];
                return [4 /*yield*/, orderService.deleteOrder(orderId)];
            case 1:
                message = _a.sent();
                (0, responseService_1.sendResponse)(res, 200, message);
                return [3 /*break*/, 3];
            case 2:
                (0, responseService_1.sendResponse)(res, 400, "Invalid order ID. Please provide a numeric ID.");
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_6 = _a.sent();
                console.error("Error during order deletion:", error_6);
                (0, responseService_1.sendResponse)(res, 422, "Failed to delete order: ".concat(error_6 instanceof Error ? error_6.message : 'Unknown error'));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports["default"] = orderRoute;
