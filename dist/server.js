"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var routes_1 = __importDefault(require("./routes/routes"));
var dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var PORT = process.env.PORT; // Define the port number
// Middleware to parse JSON requests
app.use(body_parser_1["default"].json());
// Basic route
app.get('/', function (req, res) {
    res.send('Hello World!');
});
// Use the routers for API routes
app.use('/api', routes_1["default"]);
// Start the server
app.listen(PORT, function () {
    console.log("Server is running on http://0.0.0.0:".concat(PORT));
});
// Export the app for testing or other uses
exports["default"] = app;
