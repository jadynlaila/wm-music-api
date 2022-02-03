const jwt = require('jsonwebtoken')
const {UnauthError} = require('../error');
require('dotenv').config()

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthError('No token provided')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userID: payload.userID, name: payload.name}

        next()
    } catch (err) {
        throw new UnauthError('Not authorized to access this route')
    }
}

module.exports = authMiddleware;