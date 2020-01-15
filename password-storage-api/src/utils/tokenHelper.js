import jwt from 'jsonwebtoken'

export const createAccessToken = async(payload) => {
    const options = {
        expiresIn: '1d'
    }
    const secret = process.env.TOKEN_SECRET

    return jwt.sign(payload, secret, options)
}