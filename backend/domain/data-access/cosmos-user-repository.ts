
import {User} from '../model/user'
const bcrypt = require('bcrypt');

import { CosmosClient, Container } from "@azure/cosmos";


const saltRounds = 10;


export const hash = async (value: string) => {
    return bcrypt.hash(value, saltRounds);
}

export const compare = async (value: string, hash: string) => {
    return bcrypt.compare(value, hash);
}

export class CosmosUserRepository {
    private static instance: CosmosUserRepository;


    constructor(private readonly container: Container) {
        if (!container) {
            throw new Error("Link Cosmos DB container is required.");
        }
    }

    static async getInstance() {
        if (!this.instance) {


            const key = process.env.COSMOS_KEY;
            const endpoint = process.env.COSMOS_ENDPOINT;
            const databaseName = process.env.COSMOS_DATABASE_NAME;
            const containerName = "users";
            const partitionKeyPath = ["/UserId"];

            if (!key || !endpoint) {
                throw new Error("Azure Cosmos DB Key, Endpoint or Database Name not provided. Exiting...");
            }

            const cosmosClient = new CosmosClient({endpoint, key});

            const {database} = await cosmosClient.databases.createIfNotExists({id: databaseName});
            const {container} = await database.containers.createIfNotExists({
                id: containerName,
                partitionKey: {
                    paths: partitionKeyPath
                }
            });

            this.instance = new CosmosUserRepository(container);
        }
        return this.instance;
    };

    // user validate password
    async validatePassword(user: User): Promise<boolean> {
        const {resource} = await this.container.item(user.getEmail, user.getEmail).read();
        const dbUser = resource as User;
        return await compare(user.getPassword, dbUser.getPassword);

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
















