const knex = require("../db/connection")

function read(reviewId){
    return knex("reviews")
        .select("*")
        .where({review_id: reviewId})
        .then((matches) => matches[0])
}

function update(updatedReviewData){
    return knex("reviews")
        .where({review_id: updatedReviewData.review_id})
        .update(updatedReviewData, "*")
        .then(()=>read(updatedReviewData.review_id))
        
}

function critic(critic_id){
    return knex("critics")
        .select("*")
        .where({critic_id})
        .then((records) => records[0])
}

function destroy(reviewId){
    return knex("reviews")
        .where({review_id: reviewId})
        .del();
}
function list(){
    return knex("reviews")
        .select("*");
}

module.exports = {
    read,
    update,
    critic,
    delete: destroy,
    list,
}