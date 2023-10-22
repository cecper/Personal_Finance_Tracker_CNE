import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {userServices} from "../domain/service/user.service";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const token = await userServices.validatePassword(req.body.username,req.body.password);
    if(token) {
        context.res = {
            body: {message: 'Authentication successful', token},
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
    else {
        context.res = {
            status: 401,
            headers: {
                "Content-Type": "application/json" 
            },
            body: {
                message: "Authentication failed"
            }
        }
    }
};

export default httpTrigger;