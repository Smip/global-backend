const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport')

const fileUpload = require('express-fileupload');
// Set up the express app
const app = express();

// Log requests to the console.
// app.use(logger('dev'));


// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use(fileUpload({createParentPath: true}));

require('./server/routes')(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(404).send({
    message: 'Not found!',
}));

module.exports = app;
