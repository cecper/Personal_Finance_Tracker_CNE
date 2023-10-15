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
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../domain/service/user.service");
const user_1 = require("../domain/model/user");
var express = require('express');
var router = express.Router();
//create user
router.post('/create', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new user_1.User(req.body.email, req.body.username, req.body.password);
        const result = yield user_service_1.userServices.createUser(user);
        res.send(result);
    });
});
//create test user
router.post('/create-test', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new user_1.User("test@gmail.com", "test", "test");
        const result = yield user_service_1.userServices.createUser(user);
        res.send(result);
    });
});
//validate password
router.post('/login', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = req.body.password;
        const username = req.body.username;
        const token = yield user_service_1.userServices.validatePassword(username, password);
        if (token) {
            yield res.status(200).json({ message: 'Authentication successful', token });
        }
        else {
            yield res.status(401).json({ message: 'Authentication failed' });
        }
    });
});
//get userid by username
router.get('/getUserId/:username', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.params.username; // Use req.params instead of req.param
        const result = yield user_service_1.userServices.getUserId(username);
        if (result) {
            yield res.status(200).json(result);
        }
        else {
            yield res.status(400).json({ message: 'User not found' });
        }
    });
});
module.exports = router;
