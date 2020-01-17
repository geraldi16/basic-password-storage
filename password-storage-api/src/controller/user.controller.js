import errorHandler from '../utils/errorHandler'
import { User } from '../../db/models'
import { createAccessToken } from '../utils/tokenHelper'
import { encodeUserId } from '../utils/userHelper'
import { isPasswordMatch } from '../utils/passwordHelper'
import { logger } from '../utils/logger'

/**
 * Register new user.
 * @param {object} req - express request object
 * @param {object} res - express response object
 */
export async function register(req, res) {
    const { name, password, confirm_password: confirmPassword } = req.body
    try {
        if (password !== confirmPassword){
            throw new Error('Confirm password is not same with password![step failed]')
        }

        // register user and create token for authentication
        const user = await User.create({
            name,
            password
        })
        if (!user){
            throw new Error('User failed to registered![step failed]')
        }
        const token = await createAccessToken({
            username: user.name,
            userId: encodeUserId(user.id)
        })

        // write log
        logger('info',`New user successfully registered - user id: ${user.id}`)

        res.send({
            error: false,
            data: token
        })
    } catch (error) {
        errorHandler(error, res)
    }
}

/**
 * Login process.
 * @param {object} req - express request object
 * @param {object} res - express response object
 */
export async function login(req, res) {
    const { name, password } = req.body
    try {
        // initial info
        logger('info',`Attempting login - user name: ${name}`)

        // check user exist
        const user = await User.findOne({where: {name}})
        if (!user){
            logger('warn',`Login failed due to name cannot found - user name: ${name}`)
            throw new Error('Invalid user name/password![step failed]')
        }

        // compare password
        const passwordMatch = await isPasswordMatch(password, user.password)
        if (!passwordMatch){
            logger('warn',`Login failed due to wrong password- user name: ${name}`)
            throw new Error('Invalid user name/password![step failed]')
        }

        // create access token
        const token = await createAccessToken({
            username: user.name,
            userId: encodeUserId(user.id)
        })
        res.send({
            error: false,
            data: token
        })
    } catch (error) {
        errorHandler(error, res)
    }
}