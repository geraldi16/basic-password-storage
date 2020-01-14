import { PasswordData } from '../../db/models'

/**
 * Get user password list.
 * @param {object} req - express request object
 * @param {object} res - express response object
 */
export async function getUserPasswords(req, res) {
    const passwordData = await PasswordData.findAll()
    try {
        res.send({
            error: false,
            data: passwordData
        })
    } catch (error) {
        res.status(400).send({
            error: true,
            message: error.message
        })
    }
}

/**
 * Get detail user password data.
 * @param {object} req - express request object
 * @param {object} res - express response object
 */
export async function getDetailUserPassword(req, res) {
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
 * Add new user password data.
 * @param {object} req - express request object
 * @param {object} res - express response object
 */
export async function addNewPassword(req, res) {
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
 * Edit user password data.
 * @param {object} req - express request object
 * @param {object} res - express response object
 */
export async function editPasswordData(req, res) {
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
 * Delete user password data.
 * @param {object} req - express request object
 * @param {object} res - express response object
 */
export async function deletePasswordData(req, res) {
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