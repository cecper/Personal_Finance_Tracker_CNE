import { Container} from "@azure/cosmos";
import {Connection} from "./connection";
import {Transaction} from "../model/transaction";
import {PiggybankRepository} from "./piggybank.repository";
import {Piggybank} from "../model/piggybank";

export class TransactionRepository {
    private static instance: TransactionRepository;
    private readonly container: Container;
    private static piggybankRepository: PiggybankRepository;

    private constructor(container: Container) {
        this.container = container;
    }

    static async getInstance(): Promise<TransactionRepository> {
        if (!this.instance) {
            const cosmosClient = Connection.createCosmosClient();
            const container = await Connection.initializeContainer(cosmosClient, "transaction", ["/id"]);

            this.instance = new TransactionRepository(container);
        }
        return this.instance;
    }

    async getAllTransaction() {
        const {resources} = await this.container.items.readAll().fetchAll();
        return resources;
    }

    //create
    async createTransaction(transaction: Transaction) {
        PiggybankRepository.getInstance().then((piggybankRepository) => {
            piggybankRepository.adjustBalance(transaction.getPiggyBankId, transaction.getAmount*10);
        });

        const {resource} = await this.container.items.create(transaction);
        return resource;
    }

    async getTransactionById(transactionId: number) {
        try {
            const document = await this.container.item(transactionId.toString()).read();
            return document.resource;
        } catch (error) {
            // Handle the error, e.g., return null for not found
            console.error("Error getting transaction:", error);
            return null;
        }
    }

    async getTransactionsByPiggyBankId(piggyBankId: number) {
        console.log(piggyBankId)
        
        const {resources} = await this.container.items.query({
            query: "SELECT * FROM transaction t WHERE t.piggyBankId = @piggyBankId",
            parameters: [
                {
                    name: "@piggyBankId",
                    value: piggyBankId
                }
            ]
        }).fetchAll();
        return resources;
    }

    async deleteTransactionById(id: string) {
        const {resource} = await this.container.item(id).delete();
        return resource;
    }
}
