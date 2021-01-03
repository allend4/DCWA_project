const { promiseImpl } = require('ejs');
var mysql = require('promise-mysql') // Load module

// Initialize pool
var pool

mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'allen',
    database: 'geography'
})
    .then((result) => { // successful
        pool = result
    })
    .catch((error) => { // failed
        res.send("<h3>ERROR MESSAGE: " + error + "</h3>")
        console.log(error)
    });

// READ country    
var getCountry = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from country') // sql query
            .then((result) => { // successfully exexcuted
                resolve(result)
            })
            .catch((error) => { // failed
                reject(error)
            })
    })
} // END READ countrey
// ADD country - *** work in progress *** pulls value as NULL, therefore errors
var addCountry = function (co_code,co_name,co_details) {
    return new Promise((resolve, reject) => {
        var myQuery = { // SQL query
            sql: 'INSERT INTO country VALUES (?,?,?)', // query
            values: [co_code, co_name, co_details] // values
        }
        pool.query(myQuery)
            .then((result) => { // successful
                resolve(result)
            })
            .catch((error) => { // failed
                reject(error)
            })
    })
} // END ADD country
// EDIT country
var editCountry = function (co_code) {
    return new Promise((resolve, reject) => {
        var myQuery = { // SQL query
            sql: 'select * from country where co_code = ?', 
            values: [co_code]
        }
        pool.query(myQuery)
            .then((result) => { // successful
                resolve(result)
            })
            .catch((error) => { // failed
                reject(error)
            })
    })
} // END EDIT country
// DELETE country
var deleteCountry = function (co_code) {
    return new Promise((resolve, reject) => {
        var myQuery = { // sql query
            sql: 'delete from country where co_code = ?', // query
            values: [co_code] // value
        }
        pool.query(myQuery)
            .then((result) => { // successful
                resolve(result)
            })
            .catch((error) => { // failed
                reject(error)
            })
    })
} // END DELETE country

// READ city
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
} // END READ city
// EDIT city
var editCity = function (cty_code) {
    return new Promise((resolve, reject) => {
        var myQuery = { // SQL query
            sql: 'select * from city where cty_code = ?', // query
            values: [cty_code] // value
        }
        pool.query(myQuery)
            .then((result) => { // successfully executed
                resolve(result)
            })
            .catch((error) => { // failed
                reject(error)
            })
    })
} // END EDIT city

module.exports = { getCountry, getCity, editCity, addCountry, editCountry, deleteCountry }