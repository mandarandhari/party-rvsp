require('dotenv').config();

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        req.user = decoded.user;
        next();
    } catch (error) {
        console.error(error.message);

        res.status(401).json({
            msg: "Invalid Token"
        });
    }
}

module.exports = auth;