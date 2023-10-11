import {Piggybank} from "../model/piggybank";
import { Container} from "@azure/cosmos";
import {Connection} from "./connection";

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


    async getAllPiggyBanks() {
        const {resources} = await this.container.items.readAll().fetchAll();
        return resources;
    }

    //create 
    async createPiggyBank(piggyBank: Piggybank) {

        const {resource} = await this.container.items.create(piggyBank);
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