import React from 'react'
import { withRouter } from 'react-router-dom'

import * as Style from './header.styled'
import { clearToken } from '../../utils/tokenHelper'
import { addNewPasswordData } from '../../api-connector/data'

class Header extends React.Component {
    state = {
        showAddModal: false,
        account: '',
        username: '',
        password: '',
    }

    /**
     * Toggle show/hide modal.
     */
    toggleModal = () => this.setState({showAddModal: !this.state.showAddModal})

    /**
     * Update state value.
     */
    handleChangeValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    /**
     * Do logout.
     */
    processLogout = () => {
        // remove token from local storage
        clearToken()

        // update authenticated in parent
        this.props.updateAuthenticated()

        // redirect to auth
        this.props.history.push('auth/login')
    }

    /**
     * process add new password data to API
     */
    processAddData = e => {
        e.preventDefault() 

        const payload = {
            account: this.state.account,
            username: this.state.username,
            password: this.state.password
        }

        addNewPasswordData(payload)
            .then(() => {
                // close modal
                this.setState({
                    showAddModal: false,
                    account: '',
                    username: '',
                    password: '',
                })
            })
    }

    renderAddModal = () => {
        const { account, username, password } = this.state
        return (
            <React.Fragment>
                <Style.Background onClick={()=>this.toggleModal()}/>
                <Style.ModalWrapper onSubmit={this.processAddData}>
                    <Style.Title>Input New Password Data</Style.Title>
                    <Style.Input
                        placeholder="Account name"
                        name="account"
                        value={account}
                        onChange={this.handleChangeValue}
                        required
                    />
                    <Style.Input
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={this.handleChangeValue}
                        required
                    />
                    <Style.Input
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={this.handleChangeValue}
                        required
                    />
                    <Style.SubmitArea>
                        <Style.SubmitButton>Submit</Style.SubmitButton>
                    </Style.SubmitArea>
                </Style.ModalWrapper>
            </React.Fragment>
            
        )
    }

    render() {
        return (
            <Style.Wrapper>
                <Style.Button onClick={()=>this.processLogout()}>Logout</Style.Button>
                <Style.Button onClick={()=>this.toggleModal()}>Add new account</Style.Button>
                {this.state.showAddModal ? this.renderAddModal() : ''}
            </Style.Wrapper>
        )
    }
}

export default withRouter(Header)