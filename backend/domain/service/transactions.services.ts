
import { Transaction } from "../model/transaction";
import { TransactionRepository} from "../data-access/transaction.repository";

export class TransactionsServices {

    private async getRepo() {
        return TransactionRepository.getInstance();
    }

    async getAllTransactions() {
        const repo = await this.getRepo();
        return repo.getAllTransaction()
    }

    async createTransaction(transaction: Transaction) {
        const repo = await this.getRepo();

        return repo.createTransaction(transaction);
    }

    async getTransactionById(transactionId: number) {
        const repo = await this.getRepo();


        return repo.getTransactionById(transactionId);
    }

    async getTransactionsByPiggyBankId(piggyBankId: number) {
        const repo = await this.getRepo();

        return await repo.getTransactionsByPiggyBankId(piggyBankId);
    }


}

export const transactionsServices = new TransactionsServices();