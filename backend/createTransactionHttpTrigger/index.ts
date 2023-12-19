import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Transaction } from "../domain/model/transaction";
import { transactionsServices } from "../domain/service/transactions.services";
import {piggybankServices} from "../domain/service/piggybank.services";
import {LinkCache} from "../domain/data-access/redis-link-cache";


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {
        const transaction = new Transaction(req.body.piggyBankId, req.body.name, req.body.description, req.body.amount, req.body.sender, req.body.receiver);
        const userName = req.body.userName;
        const result = await transactionsServices.createTransaction(transaction, userName);

        const cache = await LinkCache.getInstance();
        const piggyBanks = await piggybankServices.getAllPiggyBanks(userName);
        const json=JSON.stringify(piggyBanks);
        await cache.setPiggybank(userName, json);
        await cache.quit();
        context.res = {

            body: result,
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
                message: "creating transaction failed"
            }
        }
    }
};

export default httpTrigger;