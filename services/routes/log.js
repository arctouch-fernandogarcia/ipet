var express = require("express");
var router = express.Router();

const logController = require("../controllers/logController");

router.post('/in/', async (req, res, next) => {
    var userData = { ...req.body };
    var userHasAccess = await logController.authUser( userData );

    if (userHasAccess) {
        var JWT = await logController.generateWebToken( userData.username );
    
        if (JWT) {
            res.status(200).json(JWT);
        } else {
            res.status(500).json({
                error: process.env.COMMON_500_RESPONSE
            });
        }
    } else {
        res.status(401).json({
            error: process.env.COMMON_401_RESPONSE
        });
    }
});

module.exports = router;