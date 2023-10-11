import { CustomError } from "../domain/custom-error";
import { PiggyBank } from "../model/piggy-bank";
import { CosmosPiggyBankRepository } from "../data-access/cosmos-piggy-bank-repository";

export class LinkService {

  private async getRepo() {
    return CosmosPiggyBankRepository.getInstance();
  }

  //getall piggys
    async getAllPiggyBanks() {
        const repo = await this.getRepo();
        return repo.getAllPiggyBanks();
    }
}