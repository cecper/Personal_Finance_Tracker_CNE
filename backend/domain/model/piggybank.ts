export class Piggybank {

    private name: string
    private balance: number
    private userId: string


    constructor(name:string,balance:number,userId:string) {
        this.name = name
        this.balance = balance
        this.userId = userId
    }

    get getName(): string {
        return this.name;
    }
    get getBalance(): number {
        return this.balance;
    }
    

    set setName(value: string) {
        this.name = value;

    }
    set setBalance(value: number) {
        this.balance = value;

    }

    get getUserId(): string {
        return this.userId;
    }

    setUserId(value:string):void {
        this.userId = value;
    }
}