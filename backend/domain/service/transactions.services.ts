
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

    async createTransaction(transaction: Transaction, userName: string) {
        const repo = await this.getRepo();

        return repo.createTransaction(transaction, userName);
    }

    async getTransactionById(transactionId: string, piggyBankId: string) {
        const repo = await this.getRepo();


        return repo.getTransactionById(transactionId, piggyBankId);
    }

    async getTransactionsByPiggyBankId(piggyBankId: string) {
        const repo = await this.getRepo();

        return await repo.getTransactionsByPiggyBankId(piggyBankId);
    }

    async deleteTransactionById(transactionId: string,piggyBankId: string,userName:string) {
        const repo = await this.getRepo();
        return repo.deleteTransactionById(transactionId,piggyBankId,userName);
    }


}

export const transactionsServices = new TransactionsServices();