const {StatusCodes} = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    //create a default error
    //return res.json({ err })
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "something went wrong try again later"
    };
    //this handles any validation typically requires and enums
    if(err.name === "ValidationError") {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(', ')
        customError.statusCode = 400;
    }
    //this handles duplication
    if(err.code && err.code === 11000) {
        customError.msg = `entered user email already exists: ${Object.keys(
            err.keyValue
        )} already exists: ${Object.values(
            err.keyValue
        )}, please enter a new ${Object.keys(err.keyValue)} `
    }
    //this is for any value that does not fit the type cast
    if(err.name === "CastError") {
        customError.msg = `no item found with id: ${err.value}`
        customError.statusCode = 400;
    }
    return res.status(customError.statusCode).json({ msg: customError.msg })
}

const errorHandlerMiddleware = async (err, req, res, next) => {
    console.log(err);
    return res.status(500).json({msg: 'Something went wrong'})
}

module.exports = errorHandlerMiddleware