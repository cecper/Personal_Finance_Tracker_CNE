import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { transactionsServices } from "../domain/service/transactions.services";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {
        const piggybankId = req.body.piggybankId;
        const result = await transactionsServices.getTransactionsByPiggyBankId(piggybankId);
        context.res = {
            body: result,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    } catch (error) {
        context.res = {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                message: "piggybank has no transactions"
            }
        }
    }
};

export default httpTrigger;