import axios from './axios'

export const login = ({name, password}) =>
    axios.post('/auth/login', {name, password})

export const register = ({name, password, confirmPassword}) =>
    axios.post('/auth/register', {name, password, confirm_password: confirmPassword})