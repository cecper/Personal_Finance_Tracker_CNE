import {CosmosClient, Container} from "@azure/cosmos";

export class Connection {
    static createCosmosClient(): CosmosClient {
        const key = process.env.COSMOS_KEY;
        const endpoint = process.env.COSMOS_ENDPOINT;
        console.log(key);
        console.log(endpoint);
        if (!key || !endpoint) {
            throw new Error("Azure Cosmos DB Key or Endpoint not provided. Exiting...");
        }

        return new CosmosClient({endpoint, key});
    }

    static async initializeContainer(cosmosClient: CosmosClient, containerName: string, partitionKeyPath: string[]): Promise<Container> {
        const databaseName = process.env.COSMOS_DATABASE_NAME;

        const {database} = await cosmosClient.databases.createIfNotExists({id: databaseName});
        const {container} = await database.containers.createIfNotExists({
            id: containerName,
            partitionKey: {
                paths: partitionKeyPath,
            },
        });

        return container;
    }
}
