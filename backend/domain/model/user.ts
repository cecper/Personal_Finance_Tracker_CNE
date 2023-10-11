
    export class User {
    private readonly user_id: number
    private email: string
    private username: string
    private password: string

    constructor( email: string, username: string,  password: string,user_id: number) {
        this.email = email
        this.username = username
        this.password = password
        this.user_id=user_id
    }

    get getEmail(): string {
        return this.email;
    }
    get getAccount_id(): number {
        return this.user_id;
    }
    get getUsername(): string {
        return this.username;
    }
    get getPassword(): string {
        return this.password;
    }

    set setEmail(value: string) {
        this.email = value;
    }
    set setUsername(value: string) {
        this.username = value;
    }
    set setPassword(value: string) {
        this.password = value;
    }
}