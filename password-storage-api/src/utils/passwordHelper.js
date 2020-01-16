import bcrypt from 'bcrypt'
import cryptojs from 'crypto-js'

/**
 * Encrypt user stored password.
 * @param {string} password - user stored-to-be password
 */
export const encryptPassword = (password) => {
    const cipher = cryptojs.AES.encrypt(password, process.env.PASSWORD_SECRET)
    return cipher.toString()
}

/**
 * Decrypt user stored password.
 * @param {string} hash - user hashed-stored password
 */
export const decryptPassword = (hash) => {
    const decipher = cryptojs.AES.decrypt(hash, process.env.PASSWORD_SECRET)

    return decipher.toString(cryptojs.enc.Utf8)
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

/**
 * Check if password is matched with stored password.
 * @param {string} password - password
 * @param {string} hash - current user password hash
 */
export const isPasswordMatch = async (password, hash) => {
    return bcrypt.compare(password, hash)
}