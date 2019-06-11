const {
    MongoClient
} = require('mongodb');
const conf = require('./config')
const dbName = 'herokuwebDB';


function getAdvs(done) {
    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(conf.configMongoURI, {
                useNewUrlParser: true
            });
            const db = client.db(dbName);
            const data = await db.collection('advs').find().toArray();
            client.close();
            done(true, data)

        } catch (error) {
            client.close()
            done(false, error.message)

        }

    }())
}


module.exports = {
    getAdvs
};