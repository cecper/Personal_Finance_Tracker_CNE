
import {User} from '../model/user'
const bcrypt = require('bcrypt');

import {  Container } from "@azure/cosmos";
import {Connection} from "./connection";

const jwt =require('jsonwebtoken');

const saltRounds = 10;


export const hash = async (value: string) => {
    return bcrypt.hash(value, saltRounds);
}

export const compare = async (value: string, hash: string) => {
    return bcrypt.compare(value, hash);
}

export class UserRepository {
    private static instance: UserRepository;
    private readonly container: Container;

    private constructor(container: Container) {
        this.container = container;
    }

    static async getInstance(): Promise<UserRepository> {
        if (!this.instance) {
            const cosmosClient = Connection.createCosmosClient();
            const container = await Connection.initializeContainer(cosmosClient, "users", ["/UserId"]);

            this.instance = new UserRepository(container);
        }
        return this.instance;
    }

    // user validate password
    async validatePassword(user: User) {
        //find user by email using an sql query
        const querySpec = {
            query: "SELECT * FROM users u WHERE u.email = @email",
            parameters: [
                {
                    name: "@email",
                    value: user.getEmail
                }
                ]
        }
        const {resources} = await this.container.items.query(querySpec).fetchAll();

        if(!resources[0]){
            return null;
        }

        if (user && bcrypt.compare(user.getPassword, resources[0]["password"])) {
            console.log("passwords match");
            return this.generateToken(user)
        }
        return null;
    }


    async generateToken(user:User) {
        const payload = {
            userid: user.getEmail,
            username: user.getUsername,
        };
        const options = {
            expiresIn: "1h",
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, options);

        return token;
    }

    //create a user and hash the password
    async createUser(user: User) {
        const hashedPassword = await hash(user.getPassword);
        user.setPassword = hashedPassword;
        const {resource} = await this.container.items.create(user);
        return resource;
    }

    //get a user by email
    async getUserByEmail(email: string): Promise<User> {
        const {resource} = await this.container.item(email, email).read();
        return resource as User;
    }




}
















