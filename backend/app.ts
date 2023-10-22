import dotenv from 'dotenv';
import { Request } from "express";
import cors from "cors";
import {expressjwt} from "express-jwt";
import {Secret} from "jsonwebtoken";

dotenv.config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwtSecret:Secret=<Secret>process.env.JWT_SECRET;


var indexRouter = require('./routes/index');
var piggybankRouter = require('./routes/piggybank.routes')
var userRouter = require('./routes/user.routes')
var transactionRouter = require('./routes/transaction.routes')

var app = express();

app.use(cors<Request>());
app.use(
    expressjwt({secret: jwtSecret, algorithms: ['HS256']}).unless({path: ['/user/login',  '/user/create', "/" , "/user/remove-test"]
        }
    )
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter)
app.use('/piggybank', piggybankRouter)
app.use('/transaction', transactionRouter)


// catch 404 and forward to error handler
app.use(function(req: any, res: any, next: any) {
    next(createError(404));
    });

// error handler
app.use(function(err:any, req:any, res:any, next:any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
