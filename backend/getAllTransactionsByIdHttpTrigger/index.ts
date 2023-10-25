import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { transactionsServices } from "../domain/service/transactions.services";
import { Transaction } from "../domain/model/transaction";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const transaction = req.body.transactionId;
        const result=transactionsServices.getTransactionById(req.body.transactionId);
        context.res = {
            body: result,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
    catch (error) {
    }
};

export default httpTrigger;