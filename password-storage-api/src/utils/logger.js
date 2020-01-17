import fs from 'fs'

const COLOR = {
    info: '\x1b[0m', // default color
    error: '\x1b[31m', // red
    warn: '\x1b[33m' // yellow
}

const LOG_LEVELS = {
    error: 'ERROR',
    warn: 'WARN',
    info: 'INFO'
}

const dateFormat = date =>
    date.replace('T', ' ').replace('Z', '')


const getDate = date => date.split('T')[0]

/**
 * Write log into terminal and saved in a file.
 * @param {string} level - log level
 * @param {string} text - text to be logged
 */
export const logger = (level, text) => {
    // ignore logging if in testing mode
    if (process.env.NODE_ENV === 'test') return
    
    // prepare message format
    const datetime = new Date().toISOString()
    const formattedDate = dateFormat(datetime)
    const logMessage = `${formattedDate} ${COLOR[level]}[${LOG_LEVELS[level]}] | ${text} ${COLOR.info}\n`

    // log to terminal
    console.log(logMessage)

    // save to file
    const date = getDate(datetime)

    // create new dir if not any!
    if (!fs.existsSync('log')) fs.mkdirSync('log')

    fs.appendFileSync(`log/server-${date}.log`, logMessage)
}