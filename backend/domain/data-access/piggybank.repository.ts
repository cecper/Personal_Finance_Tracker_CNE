import {Piggybank} from "../model/piggybank";
import { Container} from "@azure/cosmos";
import {Connection} from "./connection";
import {userServices} from "../service/user.service";
import { FeedOptions } from '@azure/cosmos';

export class PiggybankRepository {
    private static instance: PiggybankRepository;
    private readonly container: Container;
    private constructor(container: Container) {
        this.container = container;
    }

    static async getInstance(): Promise<PiggybankRepository> {
        if (!this.instance) {
            const cosmosClient = Connection.createCosmosClient();
            const container = await Connection.initializeContainer(cosmosClient,"piggy-bank",["/partition"]);

            this.instance = new PiggybankRepository(container);
        }
        return this.instance;
    }


    async getAllPiggyBanks(username:string) {
        const userid:string = await userServices.getUserId(username);
        const querySpec = {
            query: "SELECT * FROM piggybank p WHERE p.userId = @userId",
            parameters: [
                {
                    name: "@userId",
                    value: userid
                }
            ]
        };
        const options: FeedOptions = {
            partitionKey: userid.toString().substring(0, 1) // Set partition key
        };
    
        const { resources } = await this.container.items.query(querySpec, options).fetchAll();

        return resources;
    }

    //create 
    async createPiggyBank(piggyBank: Piggybank, username: string) {
        const userId: string = await userServices.getUserId(username);
        piggyBank.setUserId(userId);

        // check if piggy bank for that user already exists
        const querySpec = {
            query: "SELECT * FROM piggybank p WHERE p.userId = @userId AND p.name = @name",
            parameters: [
                {
                    name: "@userId",
                    value: userId,
                },
                {
                    name: "@name",
                    value: piggyBank.getName,
                },
            ],
        };

        const { resources } = await this.container.items.query(querySpec).fetchAll();

        if (resources.length > 0) {
            throw new Error("Piggybank already exists");
        }

        const { resource } = await this.container.items.create({
            name: piggyBank.getName,
            balance: piggyBank.getBalance,
            userId: piggyBank.getUserId,
            partition: piggyBank.getUserId.toString().substring(0, 1),
        });

        return resource;
    }


    async getPiggyBankById(piggyBankId: string, username: string) {
        try {
            console.log("piggybankid: "+piggyBankId);
            console.log("username: "+username)
            const id=await userServices.getUserId(username);
            const {resource} = await this.container.item(piggyBankId,id.substring(0,1)).read();
            return resource;
        } catch (error) {
            // Handle the error, e.g., return null for not found
            console.error("Error getting piggy bank:", error);
            return null;
        }
    }


    //this function adjusts the balance of a piggybank with the given amount
    //piggyBankId: the id of the piggybank so we can find it in the database as "id"
    async adjustBalance(piggyBankId: string, amount: number, userid: string) {
        const { resource } = await this.container.item(piggyBankId,userid.substring(0,1)).read();
        const balance = resource.balance + amount;
        const { resource: updatedResource } = await this.container.item(piggyBankId.toString()).replace({
            ...resource,
            balance,
        });
        return updatedResource;

    }


    async deletePiggybankById(piggyBankId: string, username: string) {
        const userid: string = await userServices.getUserId(username);

        const {resource} =await this.container.item(piggyBankId,userid.substring(0,1)).delete();
        return resource;
    }
}