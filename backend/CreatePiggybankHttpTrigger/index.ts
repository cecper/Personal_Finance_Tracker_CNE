import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Piggybank } from "../domain/model/piggybank";
import { piggybankServices } from "../domain/service/piggybank.services";
import { LinkCache } from "../domain/data-access/redis-link-cache";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {
        const piggyBank = new Piggybank(req.body.name, req.body.balance, "");
        const result = await piggybankServices.createPiggyBank(piggyBank, req.body.username);
        const cache = await LinkCache.getInstance();

        await cache.addPiggybank(req.body.username,result);
        context.res = {
            body: result,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
    catch (error) {
        console.error(error);
        context.res = {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                message: "user already exists"
            }
        }
    }

};

export default httpTrigger;