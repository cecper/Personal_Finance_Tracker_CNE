
import { PiggyBank } from "../model/piggy-bank";
import { CosmosClient, Container } from "@azure/cosmos";


export class CosmosPiggyBankRepository {
    private static instance: CosmosPiggyBankRepository;
  
    
  
    constructor(private readonly container: Container) {
      if (!container) {
        throw new Error("Link Cosmos DB container is required.");
      }
    }
  
  static async getInstance() {
    if (!this.instance) {





      const key = process.env.COSMOS_KEY;
      const endpoint = process.env.COSMOS_ENDPOINT;
      const databaseName = process.env.COSMOS_DATABASE_NAME;
      const containerName = "piggy-bank";
      const partitionKeyPath = ["/piggybankId"];

      if (!key || !endpoint) {
        throw new Error("Azure Cosmos DB Key, Endpoint or Database Name not provided. Exiting...");
      }

      const cosmosClient = new CosmosClient({ endpoint, key });

      const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseName });
      const { container } = await database.containers.createIfNotExists({
        id: containerName,
        partitionKey: {
          paths: partitionKeyPath
        }
      });

      this.instance = new CosmosPiggyBankRepository(container);
    }
    return this.instance;
  };

    
    async getAllPiggyBanks() {
        const { resources } = await this.container.items.readAll().fetchAll();
        return resources;
    }

    //create 
    async createPiggyBank(piggyBank: PiggyBank) {
        console.log("piggyBank repo: " + piggyBank);

        const { resource } = await this.container.items.create(piggyBank);
        console.log("resource: " + resource);
        return resource;
    }

    async  getPiggyBankById(piggyBankId: number) {
         //get piggybank with id "




    }
}