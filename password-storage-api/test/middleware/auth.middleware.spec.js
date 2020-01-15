import supertest from 'supertest'

import { User } from '../../db/models'
import { createAccessToken } from '../../src/utils/tokenHelper'
import { encodeUserId } from '../../src/utils/userHelper'

let user
const req = supertest(`http://localhost:1616`)

// define request header
const header = {
    'Content-Type': 'application/json'
}

describe('auth-middleware', () => {
    beforeAll(async () => {
        user = await User.create({
            name: 'test-user',
            password: 'test-password'
        })
    })
    afterAll(async () => {
        await User.destroy({where:{}})
    })

    it('should return error because no header', async () => {
        const res = await req
            .get('/password/list')
            .set(header)

        // check status
        expect(res.status).toBe(400)

        // check result body
        expect(res.body).toEqual({
            error: true,
            message: 'Header is missing.'
        })
    })

    it('should return error because invalid token format', async () => {
        const accessToken = await createAccessToken({userId: encodeUserId(user.id)})
        header.authorization = accessToken

        const res = await req
            .get('/password/list')
            .set(header)

        // check status
        expect(res.status).toBe(400)

        // check result body
        expect(res.body).toEqual({
            error: true,
            message: 'Invalid bearer token format.'
        })
    })

    it('should success and continue process', async () => {
        const accessToken = await createAccessToken({userId: encodeUserId(user.id)})
        header.authorization = 'Bearer ' + accessToken

        const res = await req
            .get('/password/list')
            .set(header)

        // check status
        expect(res.status).toBe(200)
    })
})