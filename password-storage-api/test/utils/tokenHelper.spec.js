import * as tokenHelper from '../../src/utils/tokenHelper'

describe('token-helper', () => {
    it('should be success to create access token', async () => {
        const payload = {foo:'bar'}
        const token = await tokenHelper.createAccessToken(payload)
        
        expect(token).toBeTruthy
    })

    it('should be error due to token expire', async () => {
        const payload = {foo:'bar'}
        const token = await tokenHelper.createAccessToken(payload, '-1d')

        try {
            await tokenHelper.verifyAccessToken(token)
        } catch (error) {
            expect(error.message).toBe('jwt expired')
        }
    })

    it('should be success to verify token', async () => {
        const payload = {foo:'bar'}
        const token = await tokenHelper.createAccessToken(payload)

        const verify = await tokenHelper.verifyAccessToken(token)

        expect(verify).toBeTruthy
    })
})