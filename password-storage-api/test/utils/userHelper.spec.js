import * as userHelper from '../../src/utils/userHelper'

describe('user-helper', () => {
    it('should throw message cannot encode user id', () => {
        const input = 'lol'
        const expected = 'Cannot encode user id'

        try {
            const result = userHelper.encodeUserId(input)
        } catch (error) {
            expect(error.message).toBe(expected)
        }
    })

    it('should be success to encode id', () => {
        const input = 1
        const expected = 'VolejRejNm'

        expect(userHelper.encodeUserId(input)).toBe(expected)
    })

    it('should be success to decode id', () => {
        const input = 'VolejRejNm'
        const expected = 1

        expect(userHelper.decodeUserId(input)).toBe(expected)
    })
})