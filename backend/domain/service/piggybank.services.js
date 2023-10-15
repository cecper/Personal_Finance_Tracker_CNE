"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.piggybankServices = exports.PiggybankServices = void 0;
const piggybank_repository_1 = require("../data-access/piggybank.repository");
class PiggybankServices {
    getRepo() {
        return __awaiter(this, void 0, void 0, function* () {
            return piggybank_repository_1.PiggybankRepository.getInstance();
        });
    }
    getAllPiggyBanks(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.getRepo();
            return repo.getAllPiggyBanks(username);
        });
    }
    createPiggyBank(piggyBank, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.getRepo();
            return repo.createPiggyBank(piggyBank, username);
        });
    }
    getPiggyBankById(piggyBankId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.getRepo();
            return repo.getPiggyBankById(piggyBankId);
        });
    }
}
exports.PiggybankServices = PiggybankServices;
exports.piggybankServices = new PiggybankServices();
