import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {Piggybank} from "../domain/model/piggybank";
import {piggybankServices} from "../domain/service/piggybank.services";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
/*
    router.post('/create', async function (req: any, res: any, next: any) {

        try {
            const piggyBank = new Piggybank(req.body.name, req.body.balance, "");
            const result = await piggybankServices.createPiggyBank(piggyBank, req.body.username);

            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({message: 'Piggybank already exists'});
        }

    });*/
    try{
        const piggyBank = new Piggybank(req.body.name, req.body.balance, "");
        const result = await piggybankServices.createPiggyBank(piggyBank, req.body.username);

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
                    message: "user already exists"
                }
        }
    }

};

export default httpTrigger;