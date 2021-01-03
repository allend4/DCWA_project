var express = require('express') // express module
var mySQLDAO = require('./mySQLDAO') // calls mySQLDAO
var mongoDAO = require('./mongoDAO') // calls mongoDAO
var bodyParser = require('body-parser') // calls bodyParser

var app = express() // module into variable app

app.set('view engine', 'ejs') // Embedded Javascript
app.use(bodyParser.urlencoded({extended: false}))

// Home - redirects to index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html") // redirect
})

// READ Country
app.get('/country', (req, res) => {
    mySQLDAO.getCountry() // call getCountry method from mySQLDAO
        .then((result) => { // returns promise - success
            console.log(result) // outputs a result to the console
            res.render('listCountries', {countrys: result}) // render a view and sends the rendered HTML string to the client.
        })
        .catch((error) => { // returns promise - rejected cases
            res.send(error) // returns as text
        })
})
// addCountry *** Work in progress - calls method but values are NULL ***
app.get('/addCountry', (req, res) => {
    res.render("addCountry")
})
app.post('/addCountry',  (req, res) => {
        mySQLDAO.addCountry()
        .then((result) => {
            console.log('code: ' + req.body.co_code); // NUll
            console.log('name: ' + req.body.co_name); // NUll
            console.log('details: ' + req.body.co_details); // NUll
            res.render('listCountries', {countrys: result})
            res.send(result)  
        })
        .catch((error) => {
            res.send(error)
        })
    }) // END addCountry
// delete country
app.get('/country/:co_code',  (req, res) => { // check country code of country to delete
        mySQLDAO.deleteCountry(req.params.co_code) // object containing properties mapped to the name
        .then((result) => {
            //res.send(result)
            res.redirect('/country') // redirects (refreshes) countryList
            return   
        })
        .catch((error) => {
            res.send("<h3>Error Message: " + req.params.co_code + " has cities, it cannot be deleted</h3>")
            //res.send(error.message)
        })
    }) // END deleteCountry
// EDIT country
    app.get('/editCountry/:co_code',  (req, res) => {
        mySQLDAO.editCountry(req.params.co_code)
        .then((result) => {
            //if (result.length > 0) {
           res.send(result)
           // }
        })
        .catch((error) => {
            res.send(error)
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
// EDIT country
app.get('/allDetails/:cty_code',  (req, res) => {
    mySQLDAO.editCity(req.params.cty_code)
    .then((result) => {
       res.send(result)
       

    })
    .catch((error) => {
        res.send(error)
            res.send(error.message)
        
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
        res.redirect('/hos')
        if (result.length != 3){
            res.send("<h3>Country code must be 3 characters</h3>")  
        }
        else if (req.body.headOfState.length < 3) {
            res.send("<h3>Head of state  must be at least 3 characters</h3>")
        }
        else {
            res.send(result)
            res.redirect('/hos')
        }
    })
    .catch((error) => {
            res.send(error)
    })
})

app.listen(3007, () => { // bind + listen for connection 3007 
    console.log("Listening on port 3007")
})