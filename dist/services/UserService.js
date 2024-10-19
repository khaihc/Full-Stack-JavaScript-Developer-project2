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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.UserService = void 0;
var dbService_1 = require("./dbService");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var userQueries_sql_1 = require("../queries/userQueries.sql");
var pepper = process.env.BCRYPT_PASSWORD;
var saltRound = Number(process.env.SALT_ROUND);
var secret = String(process.env.SECRET_TOKEN);
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.fetchAllUsers = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(userQueries_sql_1.userQueries.SELECT_ALL_USERS)];
                                    case 1:
                                        result = _a.sent();
                                        if (result.rows.length > 0) {
                                            return [2 /*return*/, result.rows];
                                        }
                                        else {
                                            throw new Error("No users found in the database.");
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
    UserService.prototype.fetchUserInformation = function (user_id) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var result, user, token;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(userQueries_sql_1.userQueries.SELECT_USER_BY_ID, [user_id])];
                                    case 1:
                                        result = _a.sent();
                                        if (result.rows && result.rows.length > 0) {
                                            user = result.rows[0];
                                            token = jsonwebtoken_1["default"].sign({ userName: user.user_name, id: user.id }, secret);
                                            return [2 /*return*/, {
                                                    user: user,
                                                    token: token
                                                }];
                                        }
                                        else {
                                            throw new Error("User with ID ".concat(user_id, " does not exist."));
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
    UserService.prototype.registerUser = function (user) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var rows, hashedPassword, result, createdUser, token;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(userQueries_sql_1.userQueries.CHECK_USER_EXISTENCE, [user.user_name])];
                                    case 1:
                                        rows = (_a.sent()).rows;
                                        if (rows[0].exists) {
                                            throw new Error("User name already taken. Please choose another one.");
                                        }
                                        hashedPassword = bcrypt_1["default"].hashSync(user.password + pepper, saltRound);
                                        return [4 /*yield*/, connection.query(userQueries_sql_1.userQueries.INSERT_USER, [user.first_name, user.last_name, user.user_name, hashedPassword])];
                                    case 2:
                                        result = _a.sent();
                                        createdUser = result.rows[0];
                                        token = jsonwebtoken_1["default"].sign({ userName: createdUser.user_name, id: createdUser.id }, secret);
                                        return [2 /*return*/, {
                                                data: createdUser,
                                                token: token
                                            }];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.deleteUser = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var existingUser;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(userQueries_sql_1.userQueries.SELECT_USER_BY_ID, [userId])];
                                    case 1:
                                        existingUser = _a.sent();
                                        if (existingUser.rows.length === 0) {
                                            throw new Error("User not found. Unable to delete.");
                                        }
                                        // Delete the user
                                        return [4 /*yield*/, connection.query(userQueries_sql_1.userQueries.DELETE_USER, [userId])];
                                    case 2:
                                        // Delete the user
                                        _a.sent();
                                        return [2 /*return*/, "User with ID ".concat(userId, " has been successfully deleted.")];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.updateUser = function (userId, updatedData) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, dbService_1.executeQuery)(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                            var existingUser, setClause, sqlUpdate, values, result, updatedUser;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.query(userQueries_sql_1.userQueries.SELECT_USER_BY_ID, [userId])];
                                    case 1:
                                        existingUser = _a.sent();
                                        if (existingUser.rows.length === 0) {
                                            throw new Error("User not found. Update operation cannot be completed.");
                                        }
                                        setClause = Object.keys(updatedData).map(function (key, index) { return "".concat(key, " = $").concat(index + 1); }).join(", ");
                                        sqlUpdate = userQueries_sql_1.userQueries.UPDATE_USER(setClause);
                                        values = __spreadArray(__spreadArray([], Object.values(updatedData), true), [userId], false);
                                        return [4 /*yield*/, connection.query(sqlUpdate, values)];
                                    case 2:
                                        result = _a.sent();
                                        updatedUser = result.rows[0];
                                        return [2 /*return*/, {
                                                data: updatedUser,
                                                message: "User with ID ".concat(userId, " has been successfully updated.")
                                            }];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
