import { PasswordData, User } from '../../db/models'

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
            throw new Error('User not found.')
        }

        const accountList = await user.getAccountList()

        res.send({
            error: false,
            data: accountList
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
    const { account: accountName } = req.body
    const userId = req.decoded.userId
    try {
        const passwordData = await PasswordData.getDetailPasswordData(accountName, userId)
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
            throw new Error('Something\'s wrong while adding new password data.')
        }

        res.send({
            error: false,
            data: 'Add new password success!'
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
    const { account: accountName, new_account: newAccountName, username, password } = req.body
    const userId = req.decoded.userId
    try {
        const passwordData = await PasswordData.findOne({
            where: {accountName, userId}
        })
        if (!passwordData){
            throw new Error('Data not found.')
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
    const { account: accountName } = req.body
    const userId = req.decoded.userId
    try {
        const passwordData = await PasswordData.findOne({
            where: {accountName, userId}
        })
        if (!passwordData){
            throw new Error('Data not found.')
        }

        // delete value
        passwordData.destroy()

        res.send({
            error: false,
            data: 'Data successfully deleted.'
        })
    } catch (error) {
        res.status(400).send({
            error: true,
            message: error.message
        })
    }
}