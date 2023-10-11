export class PiggyBank {
    private readonly piggyBankId: number
    private name: string
    private balance: number
    private userId: number
    private transactions: number[]

    constructor(name:string,balance:number,userId:number,transactions:number[],piggyBankId: number) {
        this.name = name
        this.balance = balance
        this.userId = userId
        this.transactions = transactions
        this.piggyBankId=piggyBankId
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
    get getUserId(): number {
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
    set setUserId(value: number) {
        this.userId = value;

    }
    set setTransactions(value: number[]) {
        this.transactions = value;

    }
}