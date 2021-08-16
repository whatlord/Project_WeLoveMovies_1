const service = require("./reviews.service");
const AEB = require("../errors/asycErrorBoundary");

async function reviewExists(req, res, next){
    const review = await service.read(req.params.reviewId)
    if(review){
        res.locals.review = review;
        res.locals.updatedReview = req.body;
        return next();
    }
    next({status: 404, message: `Review cannot be found.`})
}

async function update(req, res, next){
    const updatedReviewData = {...res.locals.review, ...req.body.data}
    console.log(updatedReviewData)
    const updatedReview = await service.update(updatedReviewData)
    const critic = await service.critic(updatedReviewData.critic_id)
    const result = {
        ...updatedReview,
        critic,
    }
    res.json({ "data": result })
}

async function destroy(req, res, next){
    const { review } = res.locals;
    await service.delete(review.review_id)
    res.sendStatus(204)
}

async function list(req, res, next){
    const movieId = req.params.movieId;
    
    const byResult = movieId ? review => review.movie_id === Number(movieId) : () => true;
    const reviews = await service.list()
    const results = await Promise.all(reviews.map(async(review) =>{ 
        const critic = await getCritic(review.critic_id)
        
        return {...review, critic} }))
        console.log(results)
    
    res.json({ data: results.filter(byResult) })
}

async function getCritic(criticId){
    const critic = await service.critic(criticId)
    return critic;
}

module.exports = {
    update: [AEB(reviewExists), AEB(update)],
    delete: [AEB(reviewExists), AEB(destroy)],
    list: AEB(list)
}