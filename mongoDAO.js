const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'headsOfStateDB';
// Collection Name
const collName = "headsOfState";

var headsOfStateDB
var headsOfState

// Use connect method to connect to the server
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((client) => {
        headsOfStateDB = client.db(dbName)
        headsOfState = headsOfStateDB.collection(collName)
    })
    .catch((error) => {
        console.log(error)
    })

var getHeadsOfState = function() {
    return new Promise((resolve, reject) => {
        var curser = headsOfState.find()
        curser.toArray()
            .then((documents) => {
                resolve(documents)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

var addHeadsOfState = function(_id, headOfState) {
    return new Promise((resolve, reject) => {
        headsOfState.insertOne({"_id":_id, "headOfState":headOfState})
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

module.exports = { getHeadsOfState, addHeadsOfState }