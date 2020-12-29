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
app.post('/addCountry',  (req, res) => {
        var errors = validationResult(req) // check for errors
        if (!errors.isEmpty()) { // if errors exist
            //res.send("Errors in page")
            res.render("addCountry", {errors:errors.errors, code:req.body.co_code, name:req.body.co_name, details:req.body.co_details})
        }
        else { // of no errors
            console.log(req.body)
            employeesFile.employees.push({ code:req.body.co_code, name:req.body.co_name, details:req.body.co_details }) // push data to employees array
            //res.send("Add employee post recieved.")
            res.redirect('/country') // redirects 
        }
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
            res.send("Error: Employee with ID:" + req.body._id + " already exists")
        }
        else {
            res.send(error.message)
        }
    })
})


app.listen(3007, () => {
    console.log("Listening on port 3007")
})