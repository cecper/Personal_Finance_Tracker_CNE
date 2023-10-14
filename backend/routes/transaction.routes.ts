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
    const transaction = new Transaction(req.body.transactionId, req.body.piggybankId, req.body.name, req.body.description, req.body.amount, req.body.sender, req.body.receiver);
    const result = await transactionsServices.createTransaction(transaction);

    res.send(result);
});

//create test transaction
router.post('/create-test', async function (req: any, res: any, next: any) {
    const transaction = new Transaction(1, 1, "test", "testdisc", 100, "testsender", "testreceiver");
    const result = await transactionsServices.createTransaction(transaction);

    res.send(result);

});

//create test transaction

//get transaction by id
router.get('/get/:transactionId', async function (req: any, res: any, next: any) {

});


module.exports = router;