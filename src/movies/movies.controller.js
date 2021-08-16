const service = require("./movies.service");
const AEB = require("../errors/asycErrorBoundary");

async function list(req, res, next){
    const { is_showing=false } = req.query;
    const data = await service.list(is_showing);
    res.json({ data });
}

async function movieExists(req, res, next){
    const movie = await service.read(req.params.movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    next({ status: 404, message: `Movie cannot be found.` });

}

function read(req, res, next){
    const { movie: data } = res.locals;
    res.json({ data })
}

module.exports = {
    list: [AEB(list)],
    read: [AEB(movieExists), AEB(read)],
    movieExists
}