import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { piggybankServices } from "../domain/service/piggybank.services";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const piggyBanks = await piggybankServices.getAllPiggyBanks(req.body.username);
    
    context.res = {
        body: piggyBanks,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    context.log('HTTP trigger function processed a request.');
};

export default httpTrigger;