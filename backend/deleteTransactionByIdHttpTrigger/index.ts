import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { transactionsServices } from "../domain/service/transactions.services";
import {LinkCache} from "../domain/data-access/redis-link-cache";
import {piggybankServices} from "../domain/service/piggybank.services";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const resp= await transactionsServices.deleteTransactionById(req.body.transactionId,req.body.piggybankId,req.body.userName);
        const cache = await LinkCache.getInstance();

        const piggyBanks = await piggybankServices.getAllPiggyBanks(req.body.userName);
        const json=JSON.stringify(piggyBanks);
        await cache.setPiggybank(req.body.userName, json);
        await cache.quit();
        context.res = {
            body: resp,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
    catch (error) {
        console.log(error);
        context.res = { 
            status: 400,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                message: "deleting transaction failed"
            }
        }
    }
};

export default httpTrigger;