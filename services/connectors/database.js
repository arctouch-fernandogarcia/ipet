const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

dbConnect = (collectionName) => {
    return new Promise((resolve, reject) => {
        try {
            client.connect(err => {
                if (err) {
                    reject(err);
                }

                const dbCollection = client
                    .db(process.env.CONNECTION_DATABASE)
                    .collection(collectionName);
    
                resolve(dbCollection);
            });
        } catch(err) {
            reject(err);
        }
    });
}

dbClose = () => {
    client.close();
}

connectToCollection = (collectionName) => {
    return new Promise( async (resolve, reject) => {
        try {
            let collectionData = await dbConnect(collectionName);

            resolve(collectionData);
        } catch(err) {
            reject(err);
        }
    });
}

module.exports = {
    connectToCollection,
    dbClose
}