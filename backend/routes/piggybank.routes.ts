import {piggybankServices} from '../domain/service/piggybank.services'
import {Piggybank} from "../domain/model/piggybank";

var express = require('express');
var router = express.Router();




router.post('/getall', async function (req: any, res: any, next: any) {

        const result = await piggybankServices.getAllPiggyBanks(req.body.username);
        if(result) {
            await res.status(200).json(result);
        }
        else {
           await  res.status(400).json({message: 'User has no piggybanks'});
        }
    }
);



//create piggybank
router.post('/create', async function (req: any, res: any, next: any) {

    const piggyBank = new Piggybank(req.body.name, req.body.balance, "");
    const result = await piggybankServices.createPiggyBank(piggyBank, req.body.username);

    res.send(result);
});

//get piggybank by id
router.get('/get/:piggyBankId', async function (req: any, res: any, next: any) {
    const result = await piggybankServices.getPiggyBankById(req.params.piggyBankId);
    res.send(result);
});

//add piggybank to user



module.exports = router;





