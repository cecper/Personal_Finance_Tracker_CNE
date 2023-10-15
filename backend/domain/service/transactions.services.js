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
exports.transactionsServices = exports.TransactionsServices = void 0;
const transaction_repository_1 = require("../data-access/transaction.repository");
class TransactionsServices {
    getRepo() {
        return __awaiter(this, void 0, void 0, function* () {
            return transaction_repository_1.TransactionRepository.getInstance();
        });
    }
    getAllTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.getRepo();
            return repo.getAllTransaction();
        });
    }
    createTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.getRepo();
            return repo.createTransaction(transaction);
        });
    }
    getTransactionById(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.getRepo();
            return repo.getTransactionById(transactionId);
        });
    }
}
exports.TransactionsServices = TransactionsServices;
exports.transactionsServices = new TransactionsServices();
