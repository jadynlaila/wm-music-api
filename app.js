//Enviroment Setup
require('dotenv').config()
require('express-async-errors')

//App Cores
const express = require("express")
const app = express()
const connectdb = require("./db/connect")

//Extra Security
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')

//Routes
const auth = require('./routes/auth')
const playlist = require('./routes/playlist')

//Middleware
const notFound = require('./middleware/not-found')
const Authentication = require('./middleware/Authentication')
const errorHandler = require('./middleware/error-handler')

//SwaggerUI
//const SwaggerUI = require('swagger-ui-express')
//const YAML = require("yamljs")
//const swaggerDocs = YAML.load("./swagger.yaml")

//Variable Declarations
const port = process.env.PORT || 3000;
const minutes = 1000 * 60

app
    //rate limiter just limits the amount of calls that an id can make to your api
    .set("trust proxy", 1)
    .use(rateLimiter({
        windowMs: 15 * minutes, //every 15 minutes
        max: 100,
    }))
    .use([express.urlencoded({extended: false}), express.json()])
    
    .use(helmet())
    //prevents cors error
    .use(cors())
    //user sanitation
    .use(xss())
    //.use(express.static('./public'))
    .get("/", (req, res) => res.send(`<h1>MUSIC API</h1>`))

    //.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocs))
    //.use('/api/v1', routes)
    // .use('/api/v1/playlists', Authentication, playlist)
    .use('/api/v1/playlists', Authentication, playlist)
    .use('/api/v1/auth', auth)

    .use(notFound)
    .use(errorHandler)
    


const startApp = () => {
    try {
        connectdb(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`listening @ ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
};

startApp()