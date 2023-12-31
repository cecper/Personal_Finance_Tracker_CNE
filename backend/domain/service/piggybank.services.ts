
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

    async getPiggyBankById(piggyBankId: string,username:string) {
        const repo = await this.getRepo();
        return repo.getPiggyBankById(piggyBankId,username);
    }

    async deletePiggybank(piggyBankId:string,username:string){
        const repo = await this.getRepo();
        return repo.deletePiggybankById(piggyBankId,username);
    }
}

export const piggybankServices = new PiggybankServices();
