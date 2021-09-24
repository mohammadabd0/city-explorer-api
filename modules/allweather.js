const axios = require('axios');



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


class Waether {
    constructor(element){
        this.date = element.datetime; 
        this.description =element.weather.description;
    }

}
 
module.exports = getweatherHandler;
