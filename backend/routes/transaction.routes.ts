import { transactionsServices} from "../domain/service/transactions.services";
import {Transaction} from "../domain/model/transaction";

var express = require('express');
var router = express.Router();

router.get('/getall', async function (req: any, res: any, next: any) {
        const result = await transactionsServices.getAllTransactions()
        res.send(result);
    }
);


//create transaction
router.post('/create', async function (req: any, res: any, next: any) {

    try {
        const transaction = new Transaction(req.body.piggyBankId, req.body.name, req.body.description, req.body.amount, req.body.sender, req.body.receiver);
        const result = await transactionsServices.createTransaction(transaction);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }

});


//get transaction by id
router.get('/get/:transactionId', async function (req: any, res: any, next: any) {

});


module.exports = router;