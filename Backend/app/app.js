const express = require('express');
const app = express();
const Authrouter = require('../routes/auth.route');

app.use(express.json());

// define routes here 
app.use('/',Authrouter);

module.exports = app;