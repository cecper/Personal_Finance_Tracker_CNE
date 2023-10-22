import {piggybankServices} from '../domain/service/piggybank.services'
import {Piggybank} from "../domain/model/piggybank";

var express = require('express');
var router = express.Router();

router.post('/getall', async function (req: any, res: any, next: any) {

        try{
            const result = await piggybankServices.getAllPiggyBanks(req.body.username);
            await res.status(200).json(result);
        }
        catch (error) {
           await  res.status(400).json({message: 'User has no piggybanks'});
        }
    }
);

//create piggybank
router.post('/create', async function (req: any, res: any, next: any) {

    try {
        const piggyBank = new Piggybank(req.body.name, req.body.balance, "");
        const result = await piggybankServices.createPiggyBank(piggyBank, req.body.username);

        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({message: 'Piggybank already exists'});
    }

});

//get piggybank by id
router.get('/get/:piggyBankId', async function (req: any, res: any, next: any) {
    const result = await piggybankServices.getPiggyBankById(req.params.piggyBankId);
    res.send(result);
});


module.exports = router;





