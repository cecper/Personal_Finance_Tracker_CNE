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
exports.Connection = void 0;
const cosmos_1 = require("@azure/cosmos");
class Connection {
    static createCosmosClient() {
        const key = process.env.COSMOS_KEY;
        const endpoint = process.env.COSMOS_ENDPOINT;
        if (!key || !endpoint) {
            throw new Error("Azure Cosmos DB Key or Endpoint not provided. Exiting...");
        }
        return new cosmos_1.CosmosClient({ endpoint, key });
    }
    static initializeContainer(cosmosClient, containerName, partitionKeyPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const databaseName = process.env.COSMOS_DATABASE_NAME;
            const { database } = yield cosmosClient.databases.createIfNotExists({ id: databaseName });
            const { container } = yield database.containers.createIfNotExists({
                id: containerName,
                partitionKey: {
                    paths: partitionKeyPath,
                },
            });
            return container;
        });
    }
}
exports.Connection = Connection;
