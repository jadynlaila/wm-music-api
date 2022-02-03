const CustomAPIError = require('./custom-error')
const BadRequestError = require('./bad-request')
const UnauthError = require('./unauthenticated')
const NotFoundError = require('./not-found');


module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthError,
    NotFoundError
}