"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_jwt_1 = require("express-jwt");
dotenv_1.default.config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwtSecret = process.env.JWT_SECRET;
var indexRouter = require('./routes/index');
var piggybankRouter = require('./routes/piggybank.routes');
var userRouter = require('./routes/user.routes');
var transactionRouter = require('./routes/transaction.routes');
var app = express();
app.use((0, cors_1.default)());
app.use((0, express_jwt_1.expressjwt)({ secret: jwtSecret, algorithms: ['HS256'] }).unless({ path: ['/user/login', '/user/create', "/"]
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/piggybank', piggybankRouter);
app.use('/transaction', transactionRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
