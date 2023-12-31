
import {User} from '../model/user'
const bcrypt = require('bcryptjs');

import {Container} from "@azure/cosmos";
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
            const container = await Connection.initializeContainer(cosmosClient, "users", ["/partition"]);

            this.instance = new UserRepository(container);
        }
        return this.instance;
    }

    // user validate password
    async validatePassword(username:string,password:string) {
        //find user by email using an sql query
        const querySpec = {
            query: "SELECT * FROM users u WHERE u.username = @username",
            parameters: [
                {
                    name: "@username",
                    value: username
                }
                ]
        }
        const {resources} = await this.container.items.query(querySpec).fetchAll();

        if(!resources[0]){
            return null;
        }
        const user = new User(resources[0]["email"],resources[0]["username"],resources[0]["password"]);




        if ( await compare(password, resources[0]["password"])) {
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
        //turn email to lowercase
        user.setEmail = user.getEmail.toLowerCase();
        //check if the username or email already exists

        const querySpec = {
            query: "SELECT * FROM users u WHERE u.username = @username OR u.email = @email",
            parameters: [
                {
                    name: "@username",
                    value: user.getUsername
                },
                {
                    name: "@email",
                    value: user.getEmail
                }
            ]
        }
        const {resources} = await this.container.items.query(querySpec).fetchAll();
            if(resources[0]){
            throw new Error("Username or email already exists");
        }

        const hashedPassword = await hash(user.getPassword);
        user.setPassword = hashedPassword;
        
        const {resource} = await this.container.items.create({
            email: user.getEmail,
            username: user.getUsername,
            password: user.getPassword,
            partition: user.getEmail.substring(0, 1),
        });

        return resource;
    }

    //get a user by email
    async getUserByEmail(email: string): Promise<User> {
        //turn email to lowercase
        email = email.toLowerCase();

        const {resource} = await this.container.item(email, email).read();
        return resource as User;
    }

    async getUserId(username: string): Promise<string> {
        const querySpec = {
            query: "SELECT * FROM users u WHERE u.username = @username",
            parameters: [
                {
                    name: "@username",
                    value: username
                }
            ]
        }

        const {resources} = await this.container.items.query(querySpec).fetchAll();
        if(!resources[0]){
            return "";
        }
        return resources[0]["id"];
    }

}


















