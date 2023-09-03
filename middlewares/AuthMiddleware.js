const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.status(401).send({ status: 401, message: "Invalid Session Please Login !" })
    }
}

module.exports = {isAuth}; 