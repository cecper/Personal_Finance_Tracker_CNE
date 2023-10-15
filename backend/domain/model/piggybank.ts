export class Piggybank {
    private readonly piggyBankId: number
    private name: string
    private balance: number
    private userId: string
    private transactions: number[]


    constructor(name:string,balance:number,userId:string,piggyBankId:number) {
        this.name = name
        this.balance = balance
        this.userId = userId
        this.transactions = []
        this.piggyBankId = piggyBankId
    }

    get getPiggyBankId(): number {
        return this.piggyBankId;

    }
    get getName(): string {
        return this.name;
    }
    get getBalance(): number {
        return this.balance;
    }
    get getUserId(): string {
        return this.userId;
    }
    get getTransactions(): number[] {
        return this.transactions;

    }

    set setName(value: string) {
        this.name = value;

    }
    set setBalance(value: number) {
        this.balance = value;

    }
    set setUserId(value: string) {
        this.userId = value;

    }
    set setTransactions(value: number[]) {
        this.transactions = value;

    }
}