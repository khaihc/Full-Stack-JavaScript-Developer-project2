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
exports.UserStore = void 0;
var connection_1 = __importDefault(require("../connection"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1["default"].config();
var pepper = process.env.BCRYPT_PASSWORD;
var saltRound = Number(process.env.SALT_ROUND);
var secret = String(process.env.SECRET_TOKEN);
var UserStore = /** @class */ (function () {
    function UserStore() {
    }
    // @ts-ignore
    UserStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT * FROM users";
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        if (result && result.rows) {
                            connection.release();
                            return [2 /*return*/, result.rows];
                        }
                        else {
                            connection.release();
                            throw new Error("Data Not Found");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // @ts-ignore
    UserStore.prototype.showUserInfo = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, token, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT * FROM users WHERE id = ".concat(user_id);
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        if (result.rows && result.rows.length > 0) {
                            token = jsonwebtoken_1["default"].sign({ userName: result.rows[0].user_name, id: result.rows[0].id }, secret);
                            data = {
                                data: result.rows[0],
                                token: token
                            };
                            connection.release();
                            return [2 /*return*/, data];
                        }
                        else {
                            connection.release();
                            throw new Error("Data Not Found");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql_checkExist, existedUser, sql_insert, hash, result, createdUser, token, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql_checkExist = "SELECT EXISTS (SELECT 1 FROM users WHERE user_name = '".concat(user.userName, "' limit 1)");
                        return [4 /*yield*/, connection.query(sql_checkExist)];
                    case 2:
                        existedUser = _a.sent();
                        if (!(existedUser.rows[0] && existedUser.rows[0].exists)) return [3 /*break*/, 3];
                        connection.release();
                        throw new Error(" User name is already exist");
                    case 3:
                        sql_insert = "INSERT INTO users (first_name,last_name,user_name,password) VALUES ($1,$2,$3,$4) RETURNING *";
                        hash = bcrypt_1["default"].hashSync(user.password + pepper, saltRound);
                        return [4 /*yield*/, connection.query(sql_insert, [user.fistName, user.lastName, user.userName, hash])];
                    case 4:
                        result = _a.sent();
                        createdUser = result.rows[0];
                        token = jsonwebtoken_1["default"].sign({ userName: createdUser.user_name, id: createdUser.id }, secret);
                        data = {
                            data: result.rows[0],
                            token: token
                        };
                        connection.release();
                        //@ts-ignore
                        return [2 /*return*/, data];
                }
            });
        });
    };
    UserStore.prototype.authenticate = function (userName, password) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, user, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, connection_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT password FROM users WHERE user_name=($1)";
                        return [4 /*yield*/, connection.query(sql, [userName])];
                    case 2:
                        result = _a.sent();
                        if (result.rows.length && result.rows.length > 0) {
                            user = result.rows[0];
                            if (bcrypt_1["default"].compareSync(password + pepper, user.password)) {
                                token = jsonwebtoken_1["default"].sign({ userName: user.user_name, id: user.id }, secret);
                                connection.release();
                                //@ts-ignore
                                return [2 /*return*/, token];
                            }
                            else {
                                connection.release();
                                throw new Error("Invalid username or password. Please try again");
                            }
                        }
                        connection.release();
                        //@ts-ignore
                        return [2 /*return*/, null];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("".concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserStore;
}());
exports.UserStore = UserStore;
