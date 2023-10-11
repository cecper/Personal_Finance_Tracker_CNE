
import { PiggyBank } from "../model/piggy-bank";
import { CosmosPiggyBankRepository } from "../data-access/cosmos-piggy-bank-repository";

export class PiggybankServices {

  private async getRepo() {
    return CosmosPiggyBankRepository.getInstance();
  }

  //getall piggys
    async getAllPiggyBanks() {
        const repo = await this.getRepo();
        return repo.getAllPiggyBanks();
    }

//create piggy
    async createPiggyBank(piggyBank: PiggyBank) {
        const repo = await this.getRepo();
        console.log("piggyBank service: " + piggyBank);
        return repo.createPiggyBank(piggyBank);
    }
}

export const piggybankServices = new PiggybankServices();
