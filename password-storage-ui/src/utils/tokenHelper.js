import jwtDecode from 'jwt-decode'

/**
 * Check if token still active or not.
 */
export const isAuthenticated = () => {
    const token = window.localStorage.getItem('token')
    if (token){
        const decodedToken = jwtDecode(token)
        return decodedToken.exp * 1000 - new Date().getTime() >= 0
    }
    return false
}

/**
 * Remove token from local storage.
 */
export const clearToken = () => {
    window.localStorage.removeItem("token")
}

/**
 * Get token from local storage.
 */
export const getToken = () => {
    return window.localStorage.getItem("token")
}