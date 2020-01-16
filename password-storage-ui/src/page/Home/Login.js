import React from 'react'
import { withRouter } from 'react-router-dom'

import * as Style from './home.styled'
import { login } from '../../api-connector/auth'

class Login extends React.Component {
    state = {
        name: '',
        password: ''
    }

    /**
     * Submit login to the API.
     */
    processLogin = (e) => {
        e.preventDefault()

        const payload = {
            name: this.state.name,
            password: this.state.password
        }
        
        login(payload)
            .then(token => {
                // set token to local storage
                window.localStorage.setItem('token',token)
                // redirect to list page
                this.props.history.push('/list-page')
                // reset state
                this.setState({
                    name: '',
                    password: ''
                })
            })
            .catch(error => {
                alert(error.message)
            })
    }

    /**
     * Update state value.
     */
    handleChangeValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { name, password } = this.state
        console.log(this.state)
        return (
            <Style.Wrapper onSubmit={this.processLogin}>
                <Style.Title>Password Management App</Style.Title>
                <Style.Input 
                    placeholder="Name"
                    name="name" 
                    value={name}
                    onChange={this.handleChangeValue}
                    required
                />
                <Style.Input 
                    placeholder="Password" 
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChangeValue}
                    required
                />
                <Style.SubmitArea>
                    <Style.SubmitButton>Login</Style.SubmitButton>
                    <Style.Border>Or,</Style.Border>
                    <a href="/auth/register">Sign up</a>
                </Style.SubmitArea>
            </Style.Wrapper>
        )
    }
}

export default withRouter(Login)