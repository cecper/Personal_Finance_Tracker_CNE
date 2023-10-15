"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Piggybank = void 0;
class Piggybank {
    constructor(name, balance, userId) {
        this.name = name;
        this.balance = balance;
        this.userId = userId;
        this.transactions = [];
    }
    get getName() {
        return this.name;
    }
    get getBalance() {
        return this.balance;
    }
    get getTransactions() {
        return this.transactions;
    }
    set setName(value) {
        this.name = value;
    }
    set setBalance(value) {
        this.balance = value;
    }
    set setTransactions(value) {
        this.transactions = value;
    }
    get getUserId() {
        return this.userId;
    }
    setUserId(value) {
        this.userId = value;
    }
}
exports.Piggybank = Piggybank;
