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
// addCountry
app.get('/addCountry', (req, res) => {
    res.render("addCountry")
})
app.post('/addCountry',  (req, res) => {
        mySQLDAO.addCountry()
        .then((result) => {
            console.log('code: ' + req.body.co_code);
            console.log('name: ' + req.body.co_name);
            console.log('details: ' + req.body.co_details);
            res.send(result)  
        })
        .catch((error) => {
            res.send(error)
        })
    })
// delete country
app.get('/country/:co_code',  (req, res) => {
        mySQLDAO.deleteCountry(req.params.co_code)
        .then((result) => {
            res.send(results)
            res.redirect('../country')
            res.render('listCountry', {count: result})
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




app.listen(3007, () => {
    console.log("Listening on port 3007")
})