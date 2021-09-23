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
server.get('/movies', getmoviesHandler);
server.get('*', notFoundHandler);


//calasses
class Waether {
    constructor(element){
        this.date = element.datetime; 
        this.description =element.weather.description;
    }

}
class AllMovie{
    constructor(element){
        this.title = element.title;
        this.overview= element.overview;
        this.average_votes= element.vote_average;
        this.total_votes = element.vote_count;
        this.image_url = 'https://image.tmdb.org/t/p/w500' + element.poster_path;
        this.popularity = element.popularity;
        this.released_on = element.release_date;
        
    }
}

// Function Handlers

 function getweatherHandler(req, res) {
    
    let weathercity = req.query.city;
    // http://api.weatherbit.io/v2.0/forecast/daily?city=${weathercity}&key=
    //http://localhost:3005/weather?city=Amman
    let URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weathercity}&key=${process.env.WEATHER_KEY}`
    console.log(URL);
    
    axios.get(URL).then(weatherResults => {
     let newArray = weatherResults.data.data.map(element => {
            return new Waether(element)
         })
            res.send(newArray)
        }).catch(error =>{
            res.send(error)
        })

}

function getmoviesHandler(req, res) {
let moviesname = req.query.city
//http://localhost:3005/movies?api_key=fdabb492603b74bf82851711e86fc93a&query=Amman
//https://api.themoviedb.org/3/search/movie?api_key=
let URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${moviesname}`

axios.get(URL).then(movieResults => {
    // res.send(movieResults.data)
    //   console.log('sssssss'+movieResults);
    // console.log('ssss'+movieResults.data);
   let  newArray = movieResults.data.results.map(element => {
           return new AllMovie(element)
        })
           res.send(newArray)
       }).catch(error =>{
           res.send(error)
       })

}



// localhost:3005/ANYTHING
function notFoundHandler(req, res) {
    res.status(404).send('NOT FOUND!')
}

//for test
function testRouteHandler(req,res){ 
    res.send(  'api is working')
}


server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})









