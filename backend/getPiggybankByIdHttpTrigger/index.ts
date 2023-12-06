import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {piggybankServices} from "../domain/service/piggybank.services";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    const result = await piggybankServices.getPiggyBankById(req.params.piggyBankId);
    
    if(result) {
        context.res = {
            body: result,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
};

export default httpTrigger;