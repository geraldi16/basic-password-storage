import React from 'react'
import { withRouter } from 'react-router-dom'

import * as Style from './home.styled'
import { register } from '../../api-connector/auth'

class Register extends React.PureComponent {
    state = {
        name: '',
        password: '',
        confirmPassword: '',
        error:''
    }

    processRegister = (e) => {
        e.preventDefault()

        // check if password === confirmPassword
        if (this.state.password !== this.state.confirmPassword){
            this.setState({
                error: 'Confirm password value is not same.'
            })
        } else {
            // process register
            const payload = {
                name: this.state.name,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            }

            register(payload)
                .then(token => {
                    // set token to local storage
                    window.localStorage.setItem('token',token)
                    // redirect to list page
                    this.props.history.push('/list-page')
                    // reset state
                    this.setState({
                        name: '',
                        password: '',
                        confirmPassword: '',
                        error: ''
                    })
                    // update authenticated status
                    this.props.updateAuthenticated()
                })
                .catch(error => {
                    alert(error.message)
                })
        }
        
    }

    handleChangeValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

        // if target name === confirmPassword, check with password
        // if value is same, remove error text
        if (event.target.name === 'confirmPassword' && this.state.password === event.target.value) {
            this.setState({
                error: ''
            })
        }
    }
    render() {
        const { name, password, confirmPassword, error } = this.state
        
        return (
            <Style.Wrapper onSubmit={this.processRegister}>
                <Style.Title>Register to App</Style.Title>
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
                <Style.Input 
                    placeholder="Confirm Password" 
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.handleChangeValue}
                    required
                />
                <Style.ErrorText>{error}</Style.ErrorText>
                <Style.SubmitArea>
                    <Style.SubmitButton>Register</Style.SubmitButton>
                </Style.SubmitArea>
                <a href="/auth/login">Back to login</a>
            </Style.Wrapper>
        )
    }
}

export default withRouter(Register)