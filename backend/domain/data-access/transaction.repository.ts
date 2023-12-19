import { Container } from "@azure/cosmos";
import { Connection } from "./connection";
import { Transaction } from "../model/transaction";
import { PiggybankRepository } from "./piggybank.repository";
import { FeedOptions } from '@azure/cosmos';
import { userServices } from "../service/user.service";

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
        const { resources } = await this.container.items.readAll().fetchAll();
        return resources;
    }

    //create
    async createTransaction(transaction: Transaction, userName: string) {
        PiggybankRepository.getInstance().then(async (piggybankRepository) => {
            let userid = await userServices.getUserId(userName);

            await piggybankRepository.adjustBalance(transaction.getPiggyBankId, transaction.getAmount, userid);
        });
        const { resource } = await this.container.items.create({
            piggyBankId: transaction.getPiggyBankId,
            name: transaction.getName,
            description: transaction.getDescription,
            amount: transaction.getAmount,
            sender: transaction.getSender,
            receiver: transaction.getReceiver,
            partition: transaction.getPiggyBankId.substring(0, 1),
        });

        return resource;
    }

    async getTransactionById(transactionId: string, piggyBankId: string) {
        try {
            const { resource } = await this.container.item(transactionId, piggyBankId.substring(0, 1)).read();

            return resource;
        } catch (error) {
            // Handle the error, e.g., return null for not found
            console.error("Error getting transaction:", error);
            return null;
        }
    }

    async getTransactionsByPiggyBankId(piggyBankId: string) {
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
            partitionKey: piggyBankId.substring(0, 1) // Set partition key
        };

        const { resources } = await this.container.items.query(querySpec, options).fetchAll();
        return resources;
    }

    /*async deleteTransactionById(id: string, piggyBankId: string, userName: string) {
        //TODO: adjust balance
        PiggybankRepository.getInstance().then(async (piggybankRepository) => {
            let userid = await userServices.getUserId(userName);

            let transaction = await this.getTransactionById(id, piggyBankId);
            await piggybankRepository.adjustBalance(piggyBankId, -transaction.amount, userid);
        });

        const {resource} = await this.container.item(id, piggyBankId.substring(0, 1)).delete();
        return resource;
    }*/

    async deleteTransactionById(id: string, piggyBankId: string, userName: string) {

        const piggybankRepository = await PiggybankRepository.getInstance();
        const userid = await userServices.getUserId(userName);
        const transaction = await this.getTransactionById(id, piggyBankId);

        await piggybankRepository.adjustBalance(piggyBankId, -transaction.amount, userid);


        const { resource } = await this.container.item(id, piggyBankId.substring(0, 1)).delete();
        return resource;
    }
}
