const knex = require("../db/connection")

function read(reviewId){
    return knex("reviews")
        .select("*")
        .where({review_id: reviewId})
        .then((matches) => matches[0])
}

function update(reviewId, updatedReview){
    return knex("reviews")
        .select("*")
        .where({review_id: reviewId})
        .update(updatedReview, "*")
        .then((updatedRecords) => updatedRecords[0])
        
}

function critic(updatedReview){
    return knex("critics")
        .select("*")
        .where({critic_id: updatedReview.critic_id})
        .then((records) => records[0])
}

function destroy(reviewId){
    return knex("reviews")
        .where({review_id: reviewId})
        .del();
}

module.exports = {
    read,
    update,
    critic,
    delete: destroy,
}