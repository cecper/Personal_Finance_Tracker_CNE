
    export class User {
    private email: string
    private username: string
    private password: string


    constructor( email: string, username: string,  password: string) {
        this.email = email
        this.username = username
        this.password = password
    }

    get getEmail(): string {
        return this.email;
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