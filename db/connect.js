const mongoose = require('mongoose');
require('dotenv').config();

const connectdb = (url) => {
        mongoose
        .connect(url)
        .then(() => console.log("connect to DB..."))
        .catch((err) => console.log(err))
}

connectdb(process.env.MONGO_URL);
module.exports = connectdb;