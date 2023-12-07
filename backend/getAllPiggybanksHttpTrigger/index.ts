import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { piggybankServices } from "../domain/service/piggybank.services";

import { LinkCache } from "../domain/data-access/redis-link-cache";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const cache = await LinkCache.getInstance();
        const cachedPiggies = await cache.getPiggybank(req.body.username);

        if (cachedPiggies) {
            context.res = {
                body:  cachedPiggies,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache': 'true' // Custom header
                }
            };
            await cache.quit();
        } else {

            const piggyBanks = await piggybankServices.getAllPiggyBanks(req.body.username);
            const json=JSON.stringify(piggyBanks);
            await cache.setPiggybank(req.body.username, json);
            context.res = {
                body:  piggyBanks,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache': 'false' // Custom header
                }
            };
            await cache.quit();
        }
    } catch (error) {
        console.error(error);
        context.res = {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                message: "user has no piggybanks"
            }
        };
    }
};

export default httpTrigger;

