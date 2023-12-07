import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { transactionsServices } from "../domain/service/transactions.services";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const resp= await transactionsServices.deleteTransactionById(req.body.transactionId,req.body.piggybankId,req.body.userName);
        context.res = {
            body: resp,
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
                message: "deleting transaction failed"
            }
        }
    }
};

export default httpTrigger;