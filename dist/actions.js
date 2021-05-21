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
        while (_) try {
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
exports.updateUser = exports.deleteUser = exports.getUserByNick = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var User_1 = require("./entities/User");
var Todo_1 = require("./entities/Todo");
var createUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var message_1, user, message_2, newUser, result, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Validate the data recived from the user
                if (!request.body.nick) {
                    message_1 = {
                        message: "Nick value is missing",
                        status: 400
                    };
                    response.status(message_1.status);
                    return [2 /*return*/, response.json(message_1)];
                }
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({
                        where: {
                            nick: request.body.nick
                        }
                    })];
            case 1:
                user = _a.sent();
                if (user) {
                    message_2 = {
                        message: "Nick already exists",
                        status: 400
                    };
                    response.status(message_2.status);
                    return [2 /*return*/, response.json(message_2)];
                }
                newUser = typeorm_1.getRepository(User_1.User).create({
                    nick: request.body.nick
                });
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(newUser)];
            case 2:
                result = _a.sent();
                message = {
                    message: "User created correctly",
                    status: 201,
                    response: result
                };
                response.status(message.status);
                return [2 /*return*/, response.json(message)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var users, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).find()];
            case 1:
                users = _a.sent();
                message = {
                    message: "Users requested correctly",
                    status: 200,
                    response: users
                };
                if (users.length == 0) {
                    message.message = "No users in the database";
                }
                response.status(message.status);
                return [2 /*return*/, response.json(message)];
        }
    });
}); };
exports.getUsers = getUsers;
var getUserByNick = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var message_3, user, message_4, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Validation
                if (!request.params.nick) {
                    message_3 = {
                        message: "Missing user nick parameter",
                        status: 400
                    };
                    response.status(message_3.status);
                    return [2 /*return*/, response.json(message_3)];
                }
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({
                        where: {
                            nick: request.params.nick
                        },
                        relations: ['todos']
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    message_4 = {
                        message: "No user with this nick",
                        status: 200
                    };
                    response.status(message_4.status);
                    return [2 /*return*/, response.json(message_4)];
                }
                message = {
                    message: "User requested correctly",
                    status: 200,
                    response: user
                };
                response.status(message.status);
                return [2 /*return*/, response.json(message)];
        }
    });
}); };
exports.getUserByNick = getUserByNick;
var deleteUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var message_5, user, message, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Parameters validation
                if (!request.params.nick) {
                    message_5 = {
                        message: "Missing parameters",
                        status: 400
                    };
                    response.status(message_5.status);
                    return [2 /*return*/, response.json(message_5)];
                }
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({
                        where: { nick: request.params.nick }
                    })];
            case 1:
                user = _a.sent();
                message = {
                    message: "No users to remove",
                    status: 200
                };
                response.status(message.status);
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User)["delete"]({
                        nick: request.params.nick
                    })];
            case 2:
                result = _a.sent();
                message.response = result;
                message.message = "User removed successfuly";
                return [2 /*return*/, response.json(message)];
            case 3: return [2 /*return*/, response.json(message)];
        }
    });
}); };
exports.deleteUser = deleteUser;
var updateUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var message_6, user, message_7, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // validation of todos list and user nick
                if (!request.params.nick || !request.body.todos) {
                    message_6 = {
                        message: "Missing nick parameter or todos list in body",
                        status: 400
                    };
                    response.status(message_6.status);
                    return [2 /*return*/, response.json(message_6)];
                }
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({
                        where: { nick: request.params.nick }
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    message_7 = {
                        message: "User is not registered in the database",
                        status: 400
                    };
                    response.status(message_7.status);
                    return [2 /*return*/, response.json(message_7)];
                }
                request.body.todos.forEach(function (todo) {
                    if (todo.label) {
                        var newTodo = typeorm_1.getRepository(Todo_1.Todo).create({
                            label: todo.label,
                            done: todo.done,
                            user: user
                        });
                        typeorm_1.getRepository(Todo_1.Todo).save(newTodo);
                    }
                });
                message = {
                    message: "Tasks saved succesfuly",
                    status: 201
                };
                response.status(message.status);
                return [2 /*return*/, response.json(message)];
        }
    });
}); };
exports.updateUser = updateUser;
