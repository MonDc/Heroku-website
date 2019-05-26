const {
    MongoClient
} = require('mongodb');

const dbUrl = 'mongodb+srv://mondc:Hello@cluster0-6q4lr.mongodb.net/test?retryWrites=true';
const dbName = 'herokuwebDB';

function checkUser(email, password, callback) {
    (async function mongo() {
        let client;

        try {
            client = await MongoClient.connect(dbUrl, {
                useNewUrlParser: true
            })
            const db = client.db(dbName);
            const col = await db.collection('users');
            const user = await col.findOne({
                username: email,
                password: password
            });
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
            client = await MongoClient.connect(dbUrl, {
                useNewUrlParser: true
            })
            const db = client.db(dbName);
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


module.exports = {
    checkUser,
    addUser
};