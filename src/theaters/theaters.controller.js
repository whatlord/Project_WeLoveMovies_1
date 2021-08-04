const service = require("./theaters.service");
const AEB = require("../errors/asycErrorBoundary");
const reduceProperties = require("../utils/reduce-properties")

const reduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
  });

async function list(req, res, next){
    const theaters = await service.list()
    const result = reduceMovies(theaters)
    res.json({ data: result })
}

module.exports = {
    list,

}