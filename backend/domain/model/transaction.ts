import {PiggyBank} from "./piggy-bank";

export class Transaction {

    private readonly transactionId: number
    private piggyBankId: number
    private name: string
    private description: string
    private amount: number
    private sender:string
    private receiver:string

    constructor(transactionId: number, piggyBankId: number, name: string, description: string, amount: number, sender: string, receiver: string) {
        this.transactionId = transactionId;
        this.piggyBankId = piggyBankId;
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.sender = sender;
        this.receiver = receiver;
    }

    get getTransactionId(): number {
        return this.transactionId;
    }

    get getPiggyBankId(): number {
        return this.piggyBankId;
    }

    get getName(): string {
        return this.name;
    }

    get getDescription(): string {
        return this.description;
    }

    get getAmount(): number {
        return this.amount;
    }

    set setPiggyBankId(value: number) {
        this.piggyBankId = value;
    }

    set setName(value: string) {
        this.name = value;
    }

    set setDescription(value: string) {
        this.description = value;
    }

    set setAmount(value: number) {
        this.amount = value;
    }

    get getSender(): string {
        return this.sender;
    }

    set setSender(value: string) {
        this.sender = value;
    }

    get getReceiver(): string {
        return this.receiver;
    }

    set setReceiver(value: string) {
        this.receiver = value;
    }


}