'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const server = express();

// const weatherData = require('./data/weather.json'); //forlab07 

const PORT = process.env.PORT;
server.use(cors());

// Routes
server.get('/test', testRouteHandler);
server.get('/weather', getweatherHandler);
server.get('*', notFoundHandler);


class Waether {
    constructor(element){
        this.date = element.datetime; 
        this.description =element.weather.description;
    }

}

// Function Handlers

 function getweatherHandler(req, res) {

    let weathercity = req.query.city; // flower
    console.log(req.query)
    // http://api.weatherbit.io/v2.0/forecast/daily?city=${weathercity}&client_id=
    //http://localhost:3005/weather?city=Amman
    let URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weathercity}&client_id=${process.env.WEATHER_KEY}`
    console.log(URL);
    axios.get(URL).then(weatherResults => {
     let newArray = weatherResults.data.map(element => {
            return new Waether(element)
         })
            res.send(newArray)
        }).catch(error =>{
            res.send(error)
        })

}





// localhost:3005/ANYTHING
function notFoundHandler(req, res) {
    res.status(404).send('NOT FOUND!!')
}

//for test
function testRouteHandler(req,res){ 
    res.send(  'api is working')
}


server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})









