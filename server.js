'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();

const weatherData = require('./data/weather.json');

const PORT = process.env.PORT;
server.use(cors());

class Waether {
    constructor(date,description){
        this.date = date;
        this.description =description;
    }

}


// localhost:3002/weather?withercity=
// server.get('/weather', (req, res) =>
// {
  
//     let withercity = weatherData.find(item =>
//     {if (item.city_name.toLocaleLowerCase()=== req.query.city)
//     {return item;
//     }
//     });
//     let newArray = withercity.data.map(element => {
//       return new Waether(element.valid_date, element.weather.description); });
//     res.status(200).send(newArray);

// });

// localhost:3005/weather?city=
server.get('/weather',(req,res)=>{
    // res.send(pokeData);

    let weathercity = req.query.city;

    let Infocity = weatherData.find((item)=>{
        if(item.city_name.toLocaleLowerCase() === weathercity) {
            return item
        }
        
    });
    let newArray = Infocity.data.map(element => {
              return new Waether(element.valid_date, element.weather.description); });
            res.status(200).send(newArray);

})

//////
// localhost:3005/ANYTHING
server.get('*',(req,res)=>{
    res.status(404).send('route is not found')
})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})





