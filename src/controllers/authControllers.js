const {
    MongoClient,
    ObjectID
} = require('mongodb');

//const dbUrl = 'hidden mongo url in config';
const conf = require('./config')
//const dbName = 'herokuwebDB';

function checkUser(email, password, callback) {
    (async function mongo() {
        let client;

        try {
            client = await MongoClient.connect(conf.configMongoURI, {
                useNewUrlParser: true
            })
            const db = client.db(conf.dbName);
            const col = await db.collection('users');
            const user = await col.findOne({
                username: email,
                password: password
            });
            console.log(user);
            client.close();

            callback(user);

        } catch (error) {
            console.log(error.message);
            client.close();
            callback(null);

        }

    }())
}

function addUser(email, password, callback) {

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(conf.configMongoURI, {
                useNewUrlParser: true
            })
            const db = client.db(conf.dbName);
            const user = await db.collection('users').findOne({
                username: email
            })
            if (user) {
                client.close()
                callback(false);
            } else {
                const response = await db.collection('users').insertOne({
                    username: email,
                    password: password
                }) // this 'users' is created here!!
                client.close();
                callback(true)
            }


        } catch (error) {
            console.log(error.message)
            client.close()
            callback(false)

        }

    }())
}

function changePassword(id, newPassword, done) {
    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(conf.configMongoURI, {
                useNewUrlParser: true
            })
            const db = client.db(conf.dbName);
            const response = await db.collection('users').updateOne({
                _id: new ObjectID(id)
            }, {
                $set: {
                    password: newPassword
                }
            });
            done(response);

        } catch (error) {
            done(error.message)

        }
        client.close();
    }())

}

function newAdv(title, keywords, description, catValue, newCategory, imgURL, done) {

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(conf.configMongoURI, {
                useNewUrlParser: true
            });
            const db = client.db(conf.dbName);
            if (catValue === '-1') {
                const catResponse = await db.collection('categories').insertOne({
                    title: newCategory
                })
                //console.log(catResponse.ops.insertedId)
                catValue = catResponse.insertedId;
            }
            const response = await db.collection('advs').insertOne({
                title: title,
                keywords: keywords,
                description: description,
                category: catValue,
                imgURL: imgURL
            })
            client.close();
            done(response)

        } catch (error) {
            client.close();
            done(error.message)

        }
    }())

}


function getCategories(done) {
    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(conf.configMongoURI, {
                useNewUrlParser: true
            });
            const db = client.db(conf.dbName);
            const cats = await db.collection('categories').find().toArray();
            client.close();
            done(true, cats)



        } catch (error) {
            client.close();
            done(false, error.message)
        }
    }())
}

function getIndividualAd(id, done) {
    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(conf.configMongoURI, {
                useNewUrlParser: true
            });
            const db = client.db(conf.dbName);
            const adv = await db.collection('advs').findOne({
                _id: new ObjectID(id)
            })
            client.close()

            done(true, adv)

        } catch (error) {
            done(false, error.message)

        }
    }())

}

module.exports = {
    checkUser,
    addUser,
    changePassword,
    newAdv,
    getCategories,
    getIndividualAd

};