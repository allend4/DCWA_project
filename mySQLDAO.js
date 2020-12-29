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
var addCountry = function (co_code, co_name, co_details) {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: 'INSERT INTO country SET ? = ?', 
            values: [req.body.co_code, req.body.co_name, req.body.co_details]
        }
        pool.query(myQuery)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
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


var getCityInfo = function (cty_code) {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: 'select * from city where cty_code = ?', 
            values: [cty_code]
        }
        pool.query(myQuery)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.exports = { getCountry, getCity, getCityInfo, addCountry }