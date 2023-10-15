"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = exports.UserServices = void 0;
const user_repository_1 = require("../data-access/user.repository");
class UserServices {
    getRepo() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_repository_1.UserRepository.getInstance();
        });
    }
    //create user
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.getRepo();
            return repo.createUser(user);
        });
    }
    // user validate password
    validatePassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.getRepo();
            return repo.validatePassword(username, password);
        });
    }
    //get a user by email
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.getRepo();
            return repo.getUserByEmail(email);
        });
    }
    getUserId(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.getRepo();
            return repo.getUserId(username);
        });
    }
}
exports.UserServices = UserServices;
exports.userServices = new UserServices();
