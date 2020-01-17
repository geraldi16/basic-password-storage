import { logger } from "./logger"

/**
 * Handle error occured from controller.
 * @param {object} error - error object
 * @param {object} res - express response object
 */
const errorHandler = (error, res) => {
    if (!error.message.includes('[step failed]')){
        logger('error',error.stack)
    }
    res.status(400).send({
        error: true,
        message: error.message.replace('[step failed]','')
    })
}

export default errorHandler