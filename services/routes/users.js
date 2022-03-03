var express = require('express');
var router = express.Router();

const userController = require("../controllers/userController");
const { validateWebToken } = require("../controllers/logController");

router.get('/', validateWebToken, async (req, res, next) => {
    if (req.error) {
        res.status(400).send({
            error: process.env.COMMON_400_RESPONSE
        });
    } else {
        let getUsersReturnData = await userController.getUsers();
    
        res.status(200).json(getUsersReturnData);
    }
});

router.get('/:id', validateWebToken, async (req, res, next) => {
    if (req.error) {
        res.status(400).send({
            error: process.env.COMMON_400_RESPONSE
        });
    } else {
        let getUserReturnData = await userController.getUser(req.params.id);

        res.status(200).json(getUserReturnData);
    }
});

router.put('/', validateWebToken, async (req, res, next) => {
    if (req.error) {
        res.status(400).send({
            error: process.env.COMMON_400_RESPONSE
        });
    } else {
        let userData = { ...req.body };
        let insertReturnData = await userController.insertUser( userData );

        res.status(200).json(insertReturnData);
    }
});

module.exports = router;
