import Hashids from 'hashids/cjs'

const hash = new Hashids(process.env.USERID_HASH_KEY, 10)

/**
 * Encode user id for security.
 * @param {number} id - user id
 */
export const encodeUserId = (id) => {
    const encoded = hash.encode(id)
    if (encoded === '') {
        throw new Error('Cannot encode user id')
    }
    return encoded
}

/**
 * Decode user id to be revealed.
 * @param {string} hashId - hashed id
 */
export const decodeUserId = (hashId) => {
    const decoded = hash.decode(hashId)
    return decoded[0]
}