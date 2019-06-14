const {
    MongoClient,
    ObjectID
} = require('mongodb');
const conf = require('./config')


// Get all advs from db

function getAdvs(done) {
    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(conf.configMongoURI, {
                useNewUrlParser: true
            });
            const db = client.db(conf.dbName);
            let data = await db.collection('advs').find().toArray();


            for (let i = 0; i < data.length; i++) {
                console.log(data[i].category)
                let category = await db.collection('categories').findOne({
                    _id: new ObjectID(data[i].category)
                })
                data[i].category = category.title
            }
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