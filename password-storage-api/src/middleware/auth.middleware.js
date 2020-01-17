import { decodeUserId } from "../utils/userHelper"
import { verifyAccessToken } from "../utils/tokenHelper"
import { logger } from "../utils/logger"

/**
 * Middleware to check token when accessing private route.
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Pass to next handler
 */
export default async function authMiddleware(req, res, next) {
    try { 
        // get token from header
        const header = req.headers.authorization
        if (!header){
            logger('warn',`Attempting without header - user IP: ${req.ip}`)
            throw new Error('Header is missing.')
        }
        // check if token in correct format: `Bearer <your_token>`
        const breakdownToken = header.split(' ')
        if (breakdownToken.length !== 2) {
            logger('warn',`Attempting with malform token format - user IP: ${req.ip} | token: ${header}`)
            throw new Error('Invalid bearer token format.')
        }
        const token = breakdownToken[1]
    
        // verify token
        const decoded = await verifyAccessToken(token)

        req.decoded = decoded
        req.decoded.userId = decodeUserId(decoded.userId)
        next()
    } catch (error) {
        res.status(400).send({
            error: true,
            message: error.message
        })
    }
}