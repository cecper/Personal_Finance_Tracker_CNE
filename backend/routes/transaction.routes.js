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
const transactions_services_1 = require("../domain/service/transactions.services");
const transaction_1 = require("../domain/model/transaction");
var express = require('express');
var router = express.Router();
router.get('/getall', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield transactions_services_1.transactionsServices.getAllTransactions();
        res.send(result);
    });
});
//create transaction
router.post('/create', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = new transaction_1.Transaction(req.body.transactionId, req.body.piggybankId, req.body.name, req.body.description, req.body.amount, req.body.sender, req.body.receiver);
        const result = yield transactions_services_1.transactionsServices.createTransaction(transaction);
        res.send(result);
    });
});
//create test transaction
router.post('/create-test', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = new transaction_1.Transaction(1, 1, "test", "testdisc", 100, "testsender", "testreceiver");
        const result = yield transactions_services_1.transactionsServices.createTransaction(transaction);
        res.send(result);
    });
});
//create test transaction
//get transaction by id
router.get('/get/:transactionId', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
    });
});
module.exports = router;
