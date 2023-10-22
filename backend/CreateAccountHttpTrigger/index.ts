import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {User} from "../domain/model/user";
import {userServices} from "../domain/service/user.service";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {





    const user = new User(req.body.email,req.body.username, req.body.password );
    const result = await userServices.createUser(user);


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result,
        headers: {
            'Content-Type': 'application/json'
        }
    }
};

export default httpTrigger;