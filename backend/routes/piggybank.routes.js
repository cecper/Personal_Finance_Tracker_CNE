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
const piggybank_services_1 = require("../domain/service/piggybank.services");
const piggybank_1 = require("../domain/model/piggybank");
var express = require('express');
var router = express.Router();
router.post('/getall', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield piggybank_services_1.piggybankServices.getAllPiggyBanks(req.body.username);
        if (result) {
            yield res.status(200).json(result);
        }
        else {
            yield res.status(400).json({ message: 'User has no piggybanks' });
        }
    });
});
//create piggybank
router.post('/create', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const piggyBank = new piggybank_1.Piggybank(req.body.name, req.body.balance, "");
        const result = yield piggybank_services_1.piggybankServices.createPiggyBank(piggyBank, req.body.username);
        res.send(result);
    });
});
//get piggybank by id
router.get('/get/:piggyBankId', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield piggybank_services_1.piggybankServices.getPiggyBankById(req.params.piggyBankId);
        res.send(result);
    });
});
//add piggybank to user
module.exports = router;
