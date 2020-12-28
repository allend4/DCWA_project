const { promiseImpl } = require('ejs');
var mysql = require('promise-mysql')

var pool

mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'allen',
    database: 'geography'
})
    .then((result) => {
        pool = result
    })
    .catch((error) => {
        console.log(error)
    });

var getCountry = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from country') // sql query
            .then((result) => { // successfully exexcuted
                resolve(result)
            })
            .catch((error) => { // failed
                reject(error)
            })
        console.log("Ok")
    })
}

var getCity = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from city') // sql query
            .then((result) => { // successfully exexcuted
                resolve(result)
            })
            .catch((error) => { // failed
                reject(error)
            })
        console.log("Ok")
    })
}

module.exports = { getCountry, getCity }