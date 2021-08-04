const knex = require("../db/connection")

function list(showing) {
    if(showing !== "true"){
        return knex("movies").select("*")
    }else{
        return knex("movies as m")
            .select("*")
            .distinctOn("m.movie_id")
            .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
            .where({ is_showing: true })
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