import bcrypt from 'bcrypt'
import cryptojs from 'crypto-js'

export const encryptPassword = () => {
    return 'aw'
}

export const decryptPassword = () => {
    return 'aw'
}

/**
 * Encrypt user's authentication password.
 * @param {string} password - user password
 */
export const encryptAuthenticationPassword = (password) => {
    const salt = bcrypt.genSaltSync(16)
    const hash = bcrypt.hashSync(password, salt)

    return hash
}

export const isPasswordMatch = async (password, hash) => {
    return bcrypt.compare(password, hash)
}