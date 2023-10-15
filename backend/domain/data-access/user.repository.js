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
exports.UserRepository = exports.compare = exports.hash = void 0;
const user_1 = require("../model/user");
const bcrypt = require('bcrypt');
const connection_1 = require("./connection");
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const hash = (value) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt.hash(value, saltRounds);
});
exports.hash = hash;
const compare = (value, hash) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt.compare(value, hash);
});
exports.compare = compare;
class UserRepository {
    constructor(container) {
        this.container = container;
    }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.instance) {
                const cosmosClient = connection_1.Connection.createCosmosClient();
                const container = yield connection_1.Connection.initializeContainer(cosmosClient, "users", ["/UserId"]);
                this.instance = new UserRepository(container);
            }
            return this.instance;
        });
    }
    // user validate password
    validatePassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //find user by email using an sql query
            const querySpec = {
                query: "SELECT * FROM users u WHERE u.username = @username",
                parameters: [
                    {
                        name: "@username",
                        value: username
                    }
                ]
            };
            const { resources } = yield this.container.items.query(querySpec).fetchAll();
            if (!resources[0]) {
                return null;
            }
            const user = new user_1.User(resources[0]["email"], resources[0]["username"], resources[0]["password"]);
            if (user && bcrypt.compare(password, resources[0]["password"])) {
                return this.generateToken(user);
            }
            return null;
        });
    }
    generateToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                userid: user.getEmail,
                username: user.getUsername,
            };
            const options = {
                expiresIn: "1h",
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, options);
            return token;
        });
    }
    //create a user and hash the password
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield (0, exports.hash)(user.getPassword);
            user.setPassword = hashedPassword;
            const { resource } = yield this.container.items.create(user);
            return resource;
        });
    }
    //get a user by email
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const { resource } = yield this.container.item(email, email).read();
            return resource;
        });
    }
    getUserId(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const querySpec = {
                query: "SELECT * FROM users u WHERE u.username = @username",
                parameters: [
                    {
                        name: "@username",
                        value: username
                    }
                ]
            };
            const { resources } = yield this.container.items.query(querySpec).fetchAll();
            if (!resources[0]) {
                return "";
            }
            return resources[0]["id"];
        });
    }
}
exports.UserRepository = UserRepository;
