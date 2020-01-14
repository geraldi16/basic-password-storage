import { User } from '../../db/models'

/**
 * Register new user.
 * @param {object} req - express request object
 * @param {object} res - express response object
 */
export async function register(req, res) {
    
    try {
        res.send({
            error: false,
            data: 'hello world'
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
    
    try {
        res.send({
            error: false,
            data: 'hello world'
        })
    } catch (error) {
        res.status(400).send({
            error: true,
            message: error.message
        })
    }
}