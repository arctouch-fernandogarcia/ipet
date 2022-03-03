const MongoDB = require("../connectors/database");
const ObjectIdClass = require("mongodb").ObjectId;

const currenCollection = 'users';

getUsers = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let Collection = await MongoDB.connectToCollection(currenCollection);
            let ReturnData = await Collection.find().toArray();

            MongoDB.dbClose();

            resolve(ReturnData);
        } catch (err) {
            reject(err);
        }
    })
}

getUser = ( userID ) => {
    return new Promise( async (resolve, reject) => {
        try {
            const ObjectId = new ObjectIdClass(userID);

            let Collection = await MongoDB.connectToCollection(currenCollection);
            let ReturnData = await Collection.findOne({
                _id: ObjectId
            });

            MongoDB.dbClose();

            resolve(ReturnData);
        } catch (err) {
            reject(err);
        }
    })
}

findUser = ( userData ) => {
    return new Promise( async (resolve, reject) => {
        try {
            let Collection = await MongoDB.connectToCollection(currenCollection);
            let ReturnData = await Collection.find( userData ).toArray();

            MongoDB.dbClose();

            resolve(ReturnData);
        } catch (err) {
            reject(err);
        }
    });
}

insertUser = ( userData ) => {
    return new Promise( async (resolve, reject) => {
        try {
            let Collection = await MongoDB.connectToCollection(currenCollection);
            let ReturnData = await Collection.insertOne(userData);

            MongoDB.dbClose();

            resolve(ReturnData);
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    getUsers,
    getUser,
    findUser,
    insertUser
}
