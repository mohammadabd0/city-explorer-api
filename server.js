'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();

const weatherData = require('./data/weather.json');

const PORT = process.env.PORT;
server.use(cors());
server.get('/test',(req,res)=>{ 
    res.send(  'api is working')
})

class Waether {
    constructor(date,description){
        this.date = date;
        this.description =description;
    }

}

// localhost:3005/weather?namecity=
//https://city-weather33.herokuapp.com/namecity=
server.get('/weather',(req,res)=>{

    let weathercity = req.query.namecity;

    let Infocity = weatherData.find((item)=>{
        if(item.city_name === weathercity) {
            return item
        }
        
    });
    let newArray = Infocity.data.map(element => {
              return new Waether(element.datetime, element.weather.description);
            
    });
            res.status(200).send(newArray);

});

//////
// localhost:3005/ANYTHING
server.get('*',(req,res)=>{
    res.status(404).send('route is not found')
})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})





