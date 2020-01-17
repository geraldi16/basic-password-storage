import axios from './axios'

export const getListPassword = () => 
    axios.get('/password/list', {})

export const getDetailPassword = (account) => 
    axios.post('/password/detail', {account})

export const addNewPasswordData = ({account, username, password}) => 
    axios.post('/password/add', {account, username, password})

export const editPasswordData = ({account, newAccount, username, password}) => 
    axios.patch('/password/edit', {account, new_account: newAccount, username, password})

export const deletePasswordData = (account) => 
    axios.delete(`/password/delete/${account}`)