const service = require("./theaters.service");
const AEB = require("../errors/asycErrorBoundary");
const reduceProperties = require("../utils/reduce-properties")

const reduceMovies = reduceProperties("theater_id", {
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    movie_id: ["movies", null, "movie_id"],
  });

async function list(req, res, next){
    const movieId = req.params.movieId;
    
    const byResult = movieId ? theater => theater.movies.map(movie => movie.movie_id).includes(Number(movieId)) : () => true;
    const theaters = await service.list()
    
    const result = reduceMovies(theaters)
    res.json({ data: result.filter(byResult) })
}

module.exports = {
    list: AEB(list),

}