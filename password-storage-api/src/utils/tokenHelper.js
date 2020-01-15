import jwt from 'jsonwebtoken'

const tokenSecret = process.env.TOKEN_SECRET

/**
 * Create access token included basic user info and token period.
 * @param {object} payload - basic information to be encoded to jwt
 */
export const createAccessToken = async(payload) => {
    const options = {
        expiresIn: '1d'
    }
    const secret = tokenSecret

    return jwt.sign(payload, secret, options)
}

/**
 * Verify if token valid and return decoded data of it.
 * @param {string} token - access token.
 */
export const verifyAccessToken = async(token) => jwt.verify(token, tokenSecret)
