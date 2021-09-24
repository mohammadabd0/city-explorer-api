const axios = require('axios');


function getmoviesHandler(req, res) {
    let moviesname = req.query.city
    //http://localhost:3005/movies?api_key=fdabb492603b74bf82851711e86fc93a&query=Amman
    //https://api.themoviedb.org/3/search/movie?api_key=
    let URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${moviesname}`
    
    axios.get(URL).then(movieResults => {
        let  newArray = movieResults.data.results.map(element => {
            return new AllMovie(element)
        })
        res.send(newArray)
    }).catch(error =>{
        res.send(error)
    })
    
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
module.exports = getmoviesHandler;