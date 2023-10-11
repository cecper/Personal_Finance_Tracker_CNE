import {userServices} from "../domain/service/user.service";
import {User} from "../domain/model/user";

var express = require('express');
var router = express.Router();


//create user
router.post('/create', async function (req: any, res: any, next: any) {
    const user = new User(req.body.email, req.body.password, req.body.username, );

    const result = await userServices.createUser(user);
    res.send(result);
});


//create test user
router.post('/create-test', async function (req: any, res: any, next: any) {
    const user = new User("test@gmail.com", "test", "test");

    const result = await userServices.createUser(user);
    res.send(result);
});


//validate password
router.post('/login', async function (req: any, res: any, next: any) {
    const user = new User(req.body.email, req.body.password, req.body.username, );

    const result = await userServices.validatePassword(user);
    res.send(result);

});


module.exports = router;