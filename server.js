'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const server = express();
const PORT = process.env.PORT;
server.use(cors());


//import
const getmoviesHandler = require('./modules/movvies.js')
const getweatherHandler = require('./modules/allweather.js')
// Routes
server.get('/test', testRouteHandler);
server.get('/weather', getweatherHandler);
server.get('/movies', getmoviesHandler);
server.get('*', notFoundHandler);

// localhost:3005/ANYTHING
function notFoundHandler(req, res) {
    res.status(404).send('NOT FOUND!')
}

//for test
function testRouteHandler(req,res){ 
    res.send(  'api is working')
}



// localhost:3005/ANYTHINGgg
server.get('*',(req,res)=>{
    res.status(404).send('route is not found')
})



server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})









