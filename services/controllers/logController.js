const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");

generateWebToken = ( username ) => {
    return new Promise( async (resolve, reject) => {
        try {
            let GeneratedWebToken = await jwt.sign(
                { username },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES }
            );

            if (GeneratedWebToken) {
                resolve(GeneratedWebToken);
            } else {
                reject("Error while generating JWT.");
            }
        } catch (err) {
            reject(err);
        }
    });
}

validateWebToken = ( req, res, next ) => {
    try {
        let JWT = req.headers["jwt-token"];
        
        jwt.verify( JWT, process.env.TOKEN_SECRET, (err, userData) => {            
            req.error = err !== null;
            req.userData = userData;

            next();
        });
    } catch (err) {
        res.status(500).send({
            error: process.env.COMMON_500_RESPONSE
        });
    }
}

authUser = ( userData ) => {
    return new Promise( async (resolve, reject) => {
        try {
            let userRecords = await userController.findUser( userData );
            resolve (userRecords.length > 0);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    generateWebToken,
    validateWebToken,
    authUser
}