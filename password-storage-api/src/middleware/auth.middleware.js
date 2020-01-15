import { decodeUserId } from "../utils/userHelper"
import { verifyAccessToken } from "../utils/tokenHelper"

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
            throw new Error('Header is missing.')
        }
        // check if token in correct format: `Bearer <your_token>`
        const breakdownToken = header.split(' ')
        if (breakdownToken.length !== 2) {
            throw new Error('Invalid bearer token format.')
        }
        const token = breakdownToken[1]
    
        // verify token
        const decoded = await verifyAccessToken(token)

        req.decoded = decoded
        req.decoded.userId = decodeUserId(decoded.userId)
        next()
    } catch (error) {
        console.error(error)
        res.status(400).send({
            error: true,
            message: error.message
        })
    }
}