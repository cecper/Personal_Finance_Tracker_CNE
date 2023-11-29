import { Container} from "@azure/cosmos";
import {Connection} from "./connection";
import {Transaction} from "../model/transaction";
import {PiggybankRepository} from "./piggybank.repository";
import {Piggybank} from "../model/piggybank";
import { FeedOptions } from '@azure/cosmos';
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
            const container = await Connection.initializeContainer(cosmosClient, "transaction", ["/partition"]);

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
            piggybankRepository.adjustBalance(transaction.getPiggyBankId, transaction.getAmount);
        });
        const {resource} = await this.container.items.create({
            piggyBankId: transaction.getPiggyBankId,
            name: transaction.getName,
            description: transaction.getDescription,
            amount: transaction.getAmount,
            sender: transaction.getSender,
            receiver: transaction.getReceiver,
            partition: transaction.getPiggyBankId.toString().substring(0, 1),
        });

        return resource;
    }

    async getTransactionById(transactionId: string) {
        try {
            const document = await this.container.item(transactionId).read();
            return document.resource;
        } catch (error) {
            // Handle the error, e.g., return null for not found
            console.error("Error getting transaction:", error);
            return null;
        }
    }

    

async getTransactionsByPiggyBankId(piggyBankId: number) {
    const querySpec = {
        query: "SELECT * FROM c WHERE c.piggyBankId = @piggyBankId",
        parameters: [
            {
                name: "@piggyBankId",
                value: piggyBankId
            }
        ]
    };

    const options: FeedOptions = {
        partitionKey: piggyBankId.toString().substring(0, 1) // Set partition key
    };

    const { resources } = await this.container.items.query(querySpec, options).fetchAll();
    return resources;
}

    

    async deleteTransactionById(id: string) {
        const {resource} = await this.container.item(id).delete();
        return resource;
    }
}
