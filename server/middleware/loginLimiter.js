const rateLimit = require('express-rate-limit')

const {logEvents} = require ('./logger')

const loginLimiter = rateLimit({
    windowsMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 login request per `window` per minute
    message: { message: 'Too many login attemps from this IP, please try again after a 60 second pause,'},
    handler: (req, res, next, options) => {
        logEvents(`Too many request: ${options.message.message}\t${req.method}\t${req.url}\t${req.headres?.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // disable the `X-RateLimit-*` headers
})

module.exports = loginLimiter