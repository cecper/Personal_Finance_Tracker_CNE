export class Piggybank {

    private name: string
    private balance: number
    private userId: string
    private transactions: number[]


    constructor(name:string,balance:number,userId:string) {
        this.name = name
        this.balance = balance
        this.userId = userId
        this.transactions = []
    }

    get getName(): string {
        return this.name;
    }
    get getBalance(): number {
        return this.balance;
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

    set setTransactions(value: number[]) {
        this.transactions = value;
    }

    get getUserId(): string {
        return this.userId;
    }

    setUserId(value:string):void {
        this.userId = value;
    }
}