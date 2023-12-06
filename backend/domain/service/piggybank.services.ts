
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
            return await repo.createPiggyBank(piggyBank,username);
        }
        catch (error) {
            throw error;
        }

    }

    async getPiggyBankById(piggyBankId: string) {
        const repo = await this.getRepo();
        return repo.getPiggyBankById(piggyBankId);
    }

    async deletePiggybank(piggyBankId:string){
        const repo = await this.getRepo();
        return repo.deletePiggybankById(piggyBankId);
    }
}

export const piggybankServices = new PiggybankServices();
