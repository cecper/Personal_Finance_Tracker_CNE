import {piggybankServices} from '../domain/service/piggybank.services'
import {Piggybank} from "../domain/model/piggybank";

var express = require('express');
var router = express.Router();


//get all piggybanks
router.get('/getall', async function (req: any, res: any, next: any) {
        const result = await piggybankServices.getAllPiggyBanks();
        res.send(result);
    }
);


//create piggybank
router.post('/create', async function (req: any, res: any, next: any) {

    const piggyBank = new Piggybank(req.body.name, req.body.balance, req.body.userId, req.body.transactions, req.body.piggybankId);
    const result = await piggybankServices.createPiggyBank(piggyBank);

    res.send(result);
});

//get piggybank by id
router.get('/get/:piggyBankId', async function (req: any, res: any, next: any) {
    const result = await piggybankServices.getPiggyBankById(req.params.piggyBankId);
    res.send(result);
});

//add piggybank to user



module.exports = router;





