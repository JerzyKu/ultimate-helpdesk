const { format } = require("date-fns");
const { v4: uuid } = require('uuid')
const fs = require('fs');
const fsPromises = require('fs').promises
const path = require("path");

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logFile = `${dateTime}\t${uuid()}\t${message}\n`

    const logFolderPath = path.join(__dirname, '..', 'logs')

    try {
        if (!fs.existsSync(logFolderPath)) {
            await fsPromises.mkdir(logFolderPath)
        }
        await fsPromises.appendFile(path.join(logFolderPath, logFileName), logFile)
    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    const message = `${req.method}\t${req.url}\t${req.headers.origin}`
    logEvents(message, 'reqLog.log')
    console.log(message, req.body);
    next()
}

module.exports = {
    logger,
    logEvents
}