const service = require("./reviews.service");
const AEB = require("../errors/asycErrorBoundary");

async function reviewExists(req, res, next){
    const review = await service.read(req.params.reviewId)
    if(review){
        res.locals.review = review;
        res.locals.updatedReview = req.body.data;
        return next();
    }
    next({status: 404, message: `Review cannot be found.`})
}

async function update(req, res, next){
    const updatedReview = await service.update(req.params.reviewId, res.locals.updatedReview)
    const critic = await service.critic(res.locals.review)
    res.json({ "data": {...updatedReview, critic}})
}

async function destroy(req, res, next){
    const { review } = res.locals;
    await service.delete(review.review_id)
    res.sendStatus(204)
}

module.exports = {
    update: [AEB(reviewExists), AEB(update)],
    delete: [AEB(reviewExists), AEB(destroy)]
}