import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { piggybankServices } from "../domain/service/piggybank.services";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const piggyBanks = await piggybankServices.getAllPiggyBanks(req.body.username);
    
    try{
    context.res = {
        body: piggyBanks,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    }
    catch (error) {
        context.res = {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                message: "user has no piggybanks"
            }
        }
    }
};

export default httpTrigger;