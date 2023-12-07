import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { piggybankServices } from "../domain/service/piggybank.services";

import { LinkCache } from "../domain/data-access/redis-link-cache";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const cache = await LinkCache.getInstance();
        const cachedPiggies = await cache.getPiggybank(req.body.username);

        if (cachedPiggies) {
            context.res = {
                status: 200,
                body: {
                    data: cachedPiggies
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            context.res.set('cache', 'true')
            await cache.quit();

        } else {
            const piggyBanks = await piggybankServices.getAllPiggyBanks(req.body.username);
            context.res = {
                status: 200,
                body: {
                    data: piggyBanks
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            context.res.set('cache', 'false')
            await cache.quit();
        }
    } catch (error) {
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
