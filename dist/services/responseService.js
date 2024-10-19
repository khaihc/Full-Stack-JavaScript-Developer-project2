"use strict";
exports.__esModule = true;
exports.sendResponse = void 0;
var sendResponse = function (res, statusCode, message, data) {
    if (data === void 0) { data = null; }
    var response = {
        status: statusCode,
        message: message
    };
    if (data !== null) {
        response.data = data;
        response.dataLength = Array.isArray(data) ? data.length : 1;
    }
    res.status(statusCode).json(response);
};
exports.sendResponse = sendResponse;
