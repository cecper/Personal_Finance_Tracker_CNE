import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {userServices} from "../domain/service/user.service";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {


    const username = req.params.username;  // Use req.params instead of req.param
    const result = await userServices.getUserId(username);

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