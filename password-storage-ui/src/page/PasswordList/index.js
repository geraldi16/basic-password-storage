import React from 'react'
import {FaEdit, FaTrash, FaChevronRight} from 'react-icons/fa'
import { withRouter } from 'react-router-dom'

import * as Style from './passwordList.styled'
import * as passwordData from '../../api-connector/data'
import Header from '../Header'

class PasswordList extends React.Component {
    state = { 
        accountList: [],
        showDetail: false,
        showEdit: false,
        showDelete: false,
        detailData: {},
        editedData: {},
        selectedAccount: ''
    }
    
    componentDidMount() {
        passwordData.getListPassword()
            .then(result=> this.setState({accountList: result}))
            .catch(error=>alert(error.message))
    }

    /**
     * Toggle modal open/close.
     * 
     * @param {string} type - modal name (key `showX` in state)
     */
    toggleModal = (type) => this.setState({[type]: !this.state[type]})

    /**
     * Update state value in editedData.
     */
    handleChangeValue = (event) => {
        const {detailData} = this.state
        detailData[event.target.name] = event.target.value

        this.setState({detailData})
    }

    /**
     * Get detail data from API and open selected modal
     * 
     * @param {string} account - account name
     * @param {string} type - modal name (key `showX` in state)
     */
    getDetailData = (account, type) => {
        passwordData.getDetailPassword(account)
            .then(result => this.setState({
                detailData: result,
                [type]: true
            }))
    }

    /**
     * Edit data to API.
     */
    editData = account => e => {
        e.preventDefault()

        const { detailData } = this.state
        const payload = {
            account,
            newAccount: detailData.newAccountName,
            username: detailData.username,
            password: detailData.password
        }
        
        passwordData.editPasswordData(payload)
            .then(_ => {
                // update accountList
                if (detailData.newAccountName) {
                    const accountList = this.state.accountList.map(acct => {
                        if (acct === account)
                            return detailData.newAccountName
                        return acct
                    })
                    this.setState({accountList})
                }

                // close modal
                this.setState({
                    showEdit: false
                })
            })
    }

    /**
     * Open delete modal and set selected account.
     */
    openDeleteModal = account => this.setState({showDelete: true, selectedAccount: account})

    /**
     * Confirm delete data to API.
     */
    deleteData = e => {
        e.preventDefault()
        console.log(this.state.selectedAccount)
        passwordData.deletePasswordData(this.state.selectedAccount)
            .then(_ => {
                const accountList = this.state.accountList.filter(account => account !== this.state.selectedAccount)

                this.setState({accountList, showDelete: false})
            })
    }

    /**
     * Add added data into account list.
     * 
     * @param {string} account - newly added account name
     */
    addData = (account) => {
        const { accountList } = this.state
        accountList.push(account)

        this.setState({accountList})
    }

    /**
     * Render detail data modal.
     */
    renderDetailData = () => {
        const { detailData } = this.state
        return (
            <React.Fragment>
                <Style.Background onClick={() => this.toggleModal('showDetail')}/>
                <Style.ModalWrapper style={{textAlign: 'center'}}>
                    <Style.Title>{detailData.accountName}</Style.Title>
                    <p>Username: {detailData.username}</p>
                    <p>Password: {detailData.password}</p>
                </Style.ModalWrapper>
            </React.Fragment>
        )
    }

    /**
     * Render edit data modal.
     */
    renderEditData = () => {
        const { detailData } = this.state
        return (
            <React.Fragment>
<               Style.Background onClick={() => this.toggleModal('showEdit')}/>
                <Style.ModalWrapper isEditModal={true} onSubmit={this.editData(detailData.accountName)}>
                    <Style.Title>Edit Data</Style.Title>
                    <Style.InputTitle>Account Name:</Style.InputTitle>
                    <Style.Input
                        placeholder="Account name"
                        name="newAccountName"
                        value={detailData.newAccountName ? detailData.newAccountName : detailData.accountName}
                        onChange={this.handleChangeValue}
                        required
                    />
                    <Style.InputTitle>Username:</Style.InputTitle>
                    <Style.Input
                        placeholder="Username"
                        name="username"
                        value={detailData.username}
                        onChange={this.handleChangeValue}
                        required
                    />
                    <Style.InputTitle>Password: </Style.InputTitle>
                    <Style.Input
                        placeholder="Password"
                        name="password"
                        value={detailData.password}
                        onChange={this.handleChangeValue}
                        required
                    />
                    <Style.SubmitArea>
                        <Style.SubmitButton>Edit</Style.SubmitButton>
                    </Style.SubmitArea>
                </Style.ModalWrapper>
            </React.Fragment>
        )
    }

    /**
     * Render delete confirmation.
     */
    renderDeleteConfirmation = () => {
        return (
            <React.Fragment>
                <Style.Background onClick={() => this.toggleModal('showDelete')}/>
                <Style.ModalWrapper onSubmit={this.deleteData}>
                    <Style.Title>Delete Confirmation</Style.Title>
                    <p>Are you sure want to delete this data?</p>
                    <Style.SubmitArea>
                        <Style.SubmitButton onClick={() => this.toggleModal('showDelete')}>Cancel</Style.SubmitButton>
                        <Style.WhiteButton>Yes, delete it anyway</Style.WhiteButton>
                    </Style.SubmitArea>
                </Style.ModalWrapper>
            </React.Fragment>
        )
    }

    render() {
        return (
            <Style.Wrapper>
                <Header addData={this.addData} {...this.props} />
                <Style.Table>
                    <thead>
                        <Style.TableHeader>
                            <th>Account Name</th>
                            <th></th>
                        </Style.TableHeader>
                    </thead>
                    <tbody>
                    {this.state.accountList.map(account => (
                        <Style.TableContent>
                            <Style.TableContentAccount onClick={()=>this.getDetailData(account, 'showDetail')}>
                                {account} 
                                <FaChevronRight size="10px" style={{marginLeft:10}}/>
                            </Style.TableContentAccount>
                            <td>
                                <Style.Icon 
                                    component={FaEdit}
                                    color="blue"
                                    style={{margin:'0 5px'}}
                                    onClick={()=>this.getDetailData(account, 'showEdit')}
                                />
                                <Style.Icon 
                                    component={FaTrash}
                                    color="#ff8585"
                                    style={{margin:'0 5px'}}
                                    onClick={()=>this.openDeleteModal(account)}
                                />
                            </td>
                        </Style.TableContent>
                    ))}
                    </tbody>
                </Style.Table>

                {/*  Render modal section*/}
                {this.state.showDetail ? this.renderDetailData() : ''}
                {this.state.showEdit ? this.renderEditData() : ''}
                {this.state.showDelete ? this.renderDeleteConfirmation() : ''}
            </Style.Wrapper>
        )
    }
}

export default withRouter(PasswordList)