// Environment
const dotenv = require('dotenv');
dotenv.config();

// Init
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const AYLIENTextAPI = require('aylien_textapi')
const cors = require('cors')
const port = process.env.PORT || 8081

// Middleware
const app = express()
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// External API
const textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// Designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log('Example app listening on port!', port)
})

// POST request
app.post('/sentiment', function (req, res, next) {
  try {
    textapi.sentiment({
      text: req.body.text
    }, function(error, response) {
      if (error === null) {
        res.json(response)
      }
    })
  } catch (error) {
    next(error)
  }
})
