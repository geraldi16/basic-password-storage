import supertest from 'supertest'

import { PasswordData, User } from '../../db/models'
import { createAccessToken } from '../../src/utils/tokenHelper'
import { encodeUserId } from '../../src/utils/userHelper'

let user

const req = supertest(`http://localhost:1616`)

// define request header
const header = {
    'Content-Type': 'application/json'
}
const falseHeader = {
    'Content-Type': 'application/json'
}

describe('password-controller', () => {
    beforeAll(async () => {
        user = await User.create({
            name: 'test-user',
            password: 'test-password'
        })
        // define password data
        await PasswordData.create({
            userId: user.id,
            accountName: 'account1',
            username: 'test1',
            password: 'password1'
        })
        await PasswordData.create({
            userId: user.id,
            accountName: 'account2',
            username: 'test2',
            password: 'password2'
        })

        // complete header definition
        const accessToken1 = await createAccessToken({userId: encodeUserId(user.id)})
        const accessToken2 = await createAccessToken({userId: encodeUserId(user.id + 1)})
        header.authorization = 'Bearer ' + accessToken1
        falseHeader.authorization = 'Bearer ' + accessToken2
    })
    afterAll(async () => {
        await User.destroy({where:{}})
        await PasswordData.destroy({where:{}})
    })

    it('should return error due to user not found', async() => {
        const res = await req
            .get('/password/list')
            .set(falseHeader)

        // check status
        expect(res.status).toBe(400)

        // check response
        expect(res.body).toEqual({
            error: true,
            message: 'User not found.'
        })
    })

    it('successfully get list account', async() => {
        const res = await req
            .get('/password/list')
            .set(header)

        // check status
        expect(res.status).toBe(200)

        // check response
        expect(res.body).toEqual({
            error: false,
            data: ['account1', 'account2']
        })
    })

    it('get detail data should return error because account name not found', async() => {
        const payload = {
            account: 'account999'
        }

        const res = await req
            .post('/password/detail')
            .set(header)
            .send(payload)

        // check status
        expect(res.status).toBe(400)

        // check response
        expect(res.body).toEqual({
            error: true,
            message: 'Data not found.'
        })
    })

    it('successfully get detail password data', async() => {
        const payload = {
            account: 'account1'
        }

        const res = await req
            .post('/password/detail')
            .set(header)
            .send(payload)

        // check status
        expect(res.status).toBe(200)

        // check response
        expect(res.body).toEqual({
            error: false,
            data: {
                accountName: 'account1',
                username: 'test1',
                password: 'password1'
            }
        })
    })

    it('successfully add new password data', async() => {
        const payload = {
            account: 'account3',
            username: 'test3',
            password: 'password3'
        }

        const res = await req
            .post('/password/add')
            .set(header)
            .send(payload)

        // check status
        expect(res.status).toBe(200)

        // check response
        expect(res.body).toEqual({
            error: false,
            data: 'Add new password success!'
        })
    })

    it('edit data should return error because account name not found', async() => {
        const payload = {
            account: 'account999'
        }

        const res = await req
            .patch('/password/edit')
            .set(header)
            .send(payload)

        // check status
        expect(res.status).toBe(400)

        // check response
        expect(res.body).toEqual({
            error: true,
            message: 'Data not found.'
        })
    })

    it('successfully edit password data', async() => {
        const payload = {
            account: 'account3',
            new_account: 'account4',
            username: 'test4',
            password: 'password4'
        }

        const res = await req
            .patch('/password/edit')
            .set(header)
            .send(payload)

        // check status
        expect(res.status).toBe(200)

        // check response
        expect(res.body).toEqual({
            error: false,
            data: 'Data successfully updated.'
        })
    })

    it('delete data should return error because account name not found', async() => {
        const res = await req
            .delete('/password/delete/account999')
            .set(header)

        // check status
        expect(res.status).toBe(400)

        // check response
        expect(res.body).toEqual({
            error: true,
            message: 'Data not found.'
        })
    })

    it('successfully delete password data', async() => {
        const res = await req
            .delete('/password/delete/account1')
            .set(header)

        // check status
        expect(res.status).toBe(200)

        // check response
        expect(res.body).toEqual({
            error: false,
            data: 'Data successfully deleted.'
        })
    })
})