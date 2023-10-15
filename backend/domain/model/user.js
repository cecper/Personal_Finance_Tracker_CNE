"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(email, username, password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }
    get getEmail() {
        return this.email;
    }
    get getUsername() {
        return this.username;
    }
    get getPassword() {
        return this.password;
    }
    set setEmail(value) {
        this.email = value;
    }
    set setUsername(value) {
        this.username = value;
    }
    set setPassword(value) {
        this.password = value;
    }
}
exports.User = User;
