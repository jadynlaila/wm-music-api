const express = require('express');
const authRouter = express.Router();
const {loginUser, registerUser} = require('../controllers/auth')

authRouter.route('/register').post(registerUser);
authRouter.route('/login').post(loginUser);

module.exports = authRouter;

