
import { piggybankServices } from '../domain/service/piggybank.services'
import {PiggyBank} from "../domain/model/piggy-bank";

var express = require('express');
var router = express.Router();


//get all piggybanks
router.get('/getall', async function (req: any, res: any, next: any) {
    const result = await piggybankServices.getAllPiggyBanks();
    res.send(result);
}
);


//create test piggybank
router.get('/create-test', async function (req: any, res: any, next: any) {
    //test data with type new PiggyBank
    const piggyBank = new PiggyBank("test", 0, 1, [], 1);


    const result = await piggybankServices.createPiggyBank(piggyBank);
    res.send(result);
});




module.exports = router;





