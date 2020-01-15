import supertest from 'supertest'

import { User } from '../../db/models'

let user
const req = supertest(`http://localhost:1616`)

// define request header
const header = {
    'Content-Type': 'application/json'
}

describe('user-controller', () => {
    beforeAll(async () => {
        user = await User.create({
            name: 'test-user',
            password: 'test-password'
        })
    })
    afterAll(async () => {
        await User.destroy({where:{}})
    })

    it('register error due to wrong confirm password', async () => {
        const payload = {
            name: 'user',
            password: 'password',
            confirmPassword: 'notpassword'
        }

        const res = await req
            .post('/auth/register')
            .set(header)
            .send(payload)

        // check status code
        expect(res.status).toBe(400)

        // check result
        expect(res.body).toEqual({
            error: true,
            message: 'Confirm password is not same with password!'
        })
    })

    it('register new user success', async () => {
        const payload = {
            name: 'user',
            password: 'password',
            confirm_password: 'password'
        }

        const res = await req
            .post('/auth/register')
            .set(header)
            .send(payload)

        // check status code
        expect(res.status).toBe(200)

        // check result
        expect(res.body).toEqual({
            error: false,
            data: expect.any(String)
        })
    })

    it('login error due to invalid name', async () => {
        const payload = {
            name: 'test',
            password: 'test-password'
        }

        const res = await req
            .post('/auth/login')
            .set(header)
            .send(payload)

        // check status code
        expect(res.status).toBe(400)

        // check result
        expect(res.body).toEqual({
            error: true,
            message: 'Invalid user name/password!'
        })
    })

    it('login error due to invalid password', async () => {
        const payload = {
            name: 'test-user',
            password: 'password'
        }

        const res = await req
            .post('/auth/login')
            .set(header)
            .send(payload)

        // check status code
        expect(res.status).toBe(400)

        // check result
        expect(res.body).toEqual({
            error: true,
            message: 'Invalid user name/password!'
        })
    })

    it('login success', async () => {
        const payload = {
            name: 'test-user',
            password: 'test-password'
        }

        const res = await req
            .post('/auth/login')
            .set(header)
            .send(payload)

        // check status code
        expect(res.status).toBe(200)

        // check result
        expect(res.body).toEqual({
            error: false,
            data: expect.any(String)
        })
    })
    
})