const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require("express-validator")
const cors =  require('cors')
const helmet = require("helmet")
const compression = require('compression')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config();



const swagerFile = require('./../docs/swagger-output.json')
const endpoint = require('./app')
const app = express();
app.use(expressValidator());
app.use(cors());
app.use(compression())
app.use(helmet())



app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use("/api/v1", endpoint.user);

app.use('/', swaggerUi.serve, swaggerUi.setup(swagerFile));

app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ error: "Unauthorized!" });
    }
});

module.exports = app;