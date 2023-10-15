import {Piggybank} from "../model/piggybank";
import { Container} from "@azure/cosmos";
import {Connection} from "./connection";
import {userServices} from "../service/user.service";
export class PiggybankRepository {
    private static instance: PiggybankRepository;
    private readonly container: Container;
    private constructor(container: Container) {
        this.container = container;
    }

    static async getInstance(): Promise<PiggybankRepository> {
        if (!this.instance) {
            const cosmosClient = Connection.createCosmosClient();
            const container = await Connection.initializeContainer(cosmosClient,"piggy-bank",["/piggybankid"]);

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
        const { resources } = await this.container.items
            .query(querySpec)
            .fetchAll();
        return resources;
    }

    //create 
    async createPiggyBank(piggyBank: Piggybank, username: string) {
        const userId:string = await userServices.getUserId(username);
        piggyBank.setUserId(userId);
        const { resource } = await this.container.items.create(piggyBank);
        return resource;
    }


    async getPiggyBankById(piggyBankId: number) {
        try {
            const document = await this.container.item(piggyBankId.toString()).read();
            return document.resource;
        } catch (error) {
            // Handle the error, e.g., return null for not found
            console.error("Error getting piggy bank:", error);
            return null;
        }
    }


}