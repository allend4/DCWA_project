var express = require('express')
var mySQLDAO = require('./mySQLDAO')
var mongoDAO = require('./mongoDAO')
var bodyParser = require('body-parser')
const { render } = require('ejs')
const { body } = require('express-validator')

var app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))

/*
app.get('/', (req, res) => {
    mySQLDAO.getCountry()
        .then((result) => {
            console.log(result)
            res.render('showCountrys', {countrys: result})
        })
        .catch((error) => {
            res.send(error)
        })
})
*/
/*
app.get('/', (req, res) => {
    mySQLDAO.getCity()
        .then((result) => {
            console.log(result)
            res.render('showCitys', {citys: result})
        })
        .catch((error) => {
            res.send(error)
        })
})
*/

app.get('/', (req, res) => {
    //res.send("AOK")
    mongoDAO.getHeadsOfState()
        .then((result) => {
            console.log(result)
            res.render('showHoS', {headsOfStates: result})
        })
        .catch((error) => {
            res.send(error)
        })
})


app.listen(3007, () => {
    console.log("Listening on port 3007")
})