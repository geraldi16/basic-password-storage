import errorHandler from '../utils/errorHandler'
import { PasswordData, User } from '../../db/models'
import { logger } from '../utils/logger'

/**
 * Get user password list.
 * @param {object} req - express request object
 * @param {object} res - express response object
 */
export async function getUserPasswords(req, res) {
    const userId = req.decoded.userId
    
    try {
        // fetch user data
        const user = await User.findByPk(userId)
        if (!user){
            logger('warn', `User not found - user id: ${userId}`)
            throw new Error('User not found.[step failed]')
        }

        const accountList = await user.getAccountList()

        res.send({
            error: false,
            data: accountList
        })
    } catch (error) {
        errorHandler(error, res)
    }
}

/**
 * Get detail user password data.
 * @param {object} req - express request object
 * @param {object} res - express response object
 */
export async function getDetailUserPassword(req, res) {
    const { account: accountName } = req.body
    const userId = req.decoded.userId
    try {
        const passwordData = await PasswordData.getDetailPasswordData(accountName, userId)
        res.send({
            error: false,
            data: passwordData
        })
    } catch (error) {
        errorHandler(error, res)
    }
}

/**
 * Add new user password data.
 * @param {object} req - express request object
 * @param {object} res - express response object
 */
export async function addNewPassword(req, res) {
    const { account: accountName, username, password } = req.body
    const userId = req.decoded.userId
    try {
        const passwordData = await PasswordData.create({
            userId,
            accountName,
            username,
            password
        })

        if (!passwordData){
            logger('warn', `User cannot add password data - user id: ${userId}`)
            throw new Error('Something\'s wrong while adding new password data.')
        }

        res.send({
            error: false,
            data: {
                accountName: passwordData.accountName
            }
        })
    } catch (error) {
        errorHandler(error, res)
    }
}

/**
 * Edit user password data.
 * @param {object} req - express request object
 * @param {object} res - express response object
 */
export async function editPasswordData(req, res) {
    const { account: accountName, new_account: newAccountName, username, password } = req.body
    const userId = req.decoded.userId
    try {
        const passwordData = await PasswordData.findOne({
            where: {accountName, userId}
        })
        if (!passwordData){
            logger('warn', `Edit password - password data not found - user id: ${userId} | account: ${accountName}`)
            throw new Error('Data not found.[step failed]')
        }

        // update value
        passwordData.update({
            accountName: newAccountName,
            username,
            password
        })

        res.send({
            error: false,
            data: 'Data successfully updated.'
        })
    } catch (error) {
        errorHandler(error, res)
    }
}

/**
 * Delete user password data.
 * @param {object} req - express request object
 * @param {object} res - express response object
 */
export async function deletePasswordData(req, res) {
    const { account: accountName } = req.params
    const userId = req.decoded.userId
    try {
        const passwordData = await PasswordData.findOne({
            where: {accountName, userId}
        })
        if (!passwordData){
            logger('warn', `Delete password - User not found - user id: ${userId}`)
            throw new Error('Data not found.[step failed]')
        }

        // delete value
        passwordData.destroy()

        res.send({
            error: false,
            data: 'Data successfully deleted.'
        })
    } catch (error) {
        errorHandler(error, res)
    }
}