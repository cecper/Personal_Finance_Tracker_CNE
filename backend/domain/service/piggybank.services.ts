
import { Piggybank } from "../model/piggybank";
import { PiggybankRepository } from "../data-access/piggybank.repository";

export class PiggybankServices {

  private async getRepo() {
    return PiggybankRepository.getInstance();
  }

    async getAllPiggyBanks() {
        const repo = await this.getRepo();
        return repo.getAllPiggyBanks();
    }

    async createPiggyBank(piggyBank: Piggybank) {
        const repo = await this.getRepo();

        return repo.createPiggyBank(piggyBank);
    }

    async getPiggyBankById(piggyBankId: number) {
        const repo = await this.getRepo();


        return repo.getPiggyBankById(piggyBankId);
    }
}

export const piggybankServices = new PiggybankServices();
