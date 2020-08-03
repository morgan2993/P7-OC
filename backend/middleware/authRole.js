const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'MY_SECRET_TOKEN');
        const userId = decodedToken.userId;
        const userRole = decodedToken.userRole;
        if (userRole !== 1) {
            throw 'non autorisé';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: "non autorisé"
        });
    }
};