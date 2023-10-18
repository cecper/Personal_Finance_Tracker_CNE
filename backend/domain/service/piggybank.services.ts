
import { Piggybank } from "../model/piggybank";
import { PiggybankRepository } from "../data-access/piggybank.repository";

export class PiggybankServices {

  private async getRepo() {
    return PiggybankRepository.getInstance();
  }

    async getAllPiggyBanks(username:string) {
        const repo = await this.getRepo();
        return repo.getAllPiggyBanks(username);
    }

    async createPiggyBank(piggyBank: Piggybank,username: string) {
        const repo = await this.getRepo();

        try {
            const result = await repo.createPiggyBank(piggyBank,username);
        }
        catch (error) {
            throw error;
        }



        return repo.createPiggyBank(piggyBank,username);
    }

    async getPiggyBankById(piggyBankId: number) {
        const repo = await this.getRepo();
        return repo.getPiggyBankById(piggyBankId);
    }
}

export const piggybankServices = new PiggybankServices();
