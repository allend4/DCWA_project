var express = require('express')
var mySQLDAO = require('./mySQLDAO')
var mongoDAO = require('./mongoDAO')
var bodyParser = require('body-parser')
const { render } = require('ejs')
const { body } = require('express-validator')

var app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))

// Home - redirects to index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

// Country
app.get('/country', (req, res) => {
    mySQLDAO.getCountry()
        .then((result) => {
            console.log(result)
            res.render('listCountries', {countrys: result})
        })
        .catch((error) => {
            res.send(error)
        })
})
app.get('/addCountry', (req, res) => {
    res.render("addCountry")
})
app.post('/addCountry',  (req, res) => {
        mySQLDAO.addCountry()
        .then((result) => {
            //res.send("OK")
            res.redirect('/country')
        })
        .catch((error) => {
            //res.send("NOK")
            if(error.message.includes("11000")) {
                res.send("Error")
            }
            else {
                res.send(error.message)
            }
        })
    })


// City
app.get('/city', (req, res) => {
    mySQLDAO.getCity()
        .then((result) => {
            console.log(result)
            res.render('listCities', {citys: result})
        })
        .catch((error) => {
            res.send(error)
        })
})



// Head Of State
app.get('/hos', (req, res) => {
    //res.send("AOK")
    mongoDAO.getHeadsOfState()
        .then((result) => {
            console.log(result)
            res.render('listHeadsOfState', {headsOfStates: result})
        })
        .catch((error) => {
            res.send(error)
        })
})
// ADD Head Of State
app.get('/addHos', (req, res) => {
    res.render("addHos")
})

app.post('/addHos', (req, res) => {
    mongoDAO.addHeadsOfState(req.body._id, req.body.headOfState)
    .then((result) => {
        //res.send("OK")
        res.redirect('/hos')
    })
    .catch((error) => {
        //res.send("NOK")
        if(error.message.includes("11000")) {
            res.send("Error")
        }
        else {
            res.send(error.message)
        }
    })
})

app.get('/editCountry', (req, res) => {
    res.render("editCountry")
})

app.listen(3007, () => {
    console.log("Listening on port 3007")
})