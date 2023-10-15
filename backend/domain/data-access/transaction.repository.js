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
exports.TransactionRepository = void 0;
const connection_1 = require("./connection");
class TransactionRepository {
    constructor(container) {
        this.container = container;
    }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.instance) {
                const cosmosClient = connection_1.Connection.createCosmosClient();
                const container = yield connection_1.Connection.initializeContainer(cosmosClient, "transaction", ["/id"]);
                this.instance = new TransactionRepository(container);
            }
            return this.instance;
        });
    }
    getAllTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            const { resources } = yield this.container.items.readAll().fetchAll();
            return resources;
        });
    }
    //create
    createTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const { resource } = yield this.container.items.create(transaction);
            return resource;
        });
    }
    getTransactionById(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const document = yield this.container.item(transactionId.toString()).read();
                return document.resource;
            }
            catch (error) {
                // Handle the error, e.g., return null for not found
                console.error("Error getting transaction:", error);
                return null;
            }
        });
    }
}
exports.TransactionRepository = TransactionRepository;
