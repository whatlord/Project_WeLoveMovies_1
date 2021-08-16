const knex = require("../db/connection")

function list(showing) {
    if(showing === "true"){
        return knex("movies as m")
            .select("m.*")
            .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
            .where({"mt.is_showing": true})
            .groupBy("m.movie_id")
    }else{
        return knex("movies").select("*")
            
    }
}

function read(movieId){
    return knex("movies")
        .select("*")
        .where({movie_id: movieId})
        .then((matches) => matches[0])
}

module.exports = {
    list,
    read,
}