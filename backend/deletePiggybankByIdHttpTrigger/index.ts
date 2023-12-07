import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { piggybankServices } from "../domain/service/piggybank.services";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {
        const resp=await piggybankServices.deletePiggybank(req.body.piggyBankId,req.body.userName);
        context.res = {
            
            // status: 200, /* Defaults to 200 */
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
                message: "deleting piggybank failed"
            }
        }
    }
};

export default httpTrigger;
