"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(transactionId, piggyBankId, name, description, amount, sender, receiver) {
        this.transactionId = transactionId;
        this.piggyBankId = piggyBankId;
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.sender = sender;
        this.receiver = receiver;
    }
    get getTransactionId() {
        return this.transactionId;
    }
    get getPiggyBankId() {
        return this.piggyBankId;
    }
    get getName() {
        return this.name;
    }
    get getDescription() {
        return this.description;
    }
    get getAmount() {
        return this.amount;
    }
    set setPiggyBankId(value) {
        this.piggyBankId = value;
    }
    set setName(value) {
        this.name = value;
    }
    set setDescription(value) {
        this.description = value;
    }
    set setAmount(value) {
        this.amount = value;
    }
    get getSender() {
        return this.sender;
    }
    set setSender(value) {
        this.sender = value;
    }
    get getReceiver() {
        return this.receiver;
    }
    set setReceiver(value) {
        this.receiver = value;
    }
}
exports.Transaction = Transaction;
