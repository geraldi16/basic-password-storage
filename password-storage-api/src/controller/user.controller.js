import { User } from '../../db/models'
import { createAccessToken } from '../utils/tokenHelper'
import { isPasswordMatch } from '../utils/passwordHelper'

/**
 * Register new user.
 * @param {object} req - express request object
 * @param {object} res - express response object
 */
export async function register(req, res) {
    const { name, password, confirm_password: confirmPassword } = req.body
    try {
        if (password !== confirmPassword){
            throw new Error('Confirm password is not same with password!')
        }

        // register user and create token for authentication
        const user = await User.create({
            name,
            password
        })
        if (!user){
            throw new Error('User failed to registered!')
        }
        const token = await createAccessToken({username: user.name})

        res.send({
            error: false,
            data: token
        })
    } catch (error) {
        res.status(400).send({
            error: true,
            message: error.message
        })
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
        // check user exist
        const user = await User.findOne({where: {name}})
        if (!user){
            throw new Error('Invalid user name/password!')
        }

        // compare password
        const passwordMatch = await isPasswordMatch(password, user.password)
        if (!passwordMatch){
            throw new Error('Invalid user name/password!')
        }

        // create access token
        const token = await createAccessToken({username: user.name})
        res.send({
            error: false,
            data: token
        })
    } catch (error) {
        res.status(400).send({
            error: true,
            message: error.message
        })
    }
}