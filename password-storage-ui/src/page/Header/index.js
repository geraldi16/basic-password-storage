import React from 'react'
import { withRouter } from 'react-router-dom'

import * as Style from './header.styled'
import { clearToken } from '../../utils/tokenHelper'

class Header extends React.Component {
    processLogout = () => {
        // remove token from local storage
        clearToken()

        // update authenticated in parent
        this.props.updateAuthenticated()

        // redirect to auth
        this.props.history.push('auth/login')
    }

    render() {
        return (
            <Style.Wrapper>
                <Style.Button onClick={()=>this.processLogout()}>Logout</Style.Button>
            </Style.Wrapper>
        )
    }
}

export default withRouter(Header)