import React from 'react'

import Login from './Login'
import Register from './Register'

class Home extends React.PureComponent {
    render() {
        const {authType} = this.props.match.params
        if (authType === 'register') {
            return <Register />
        }
        return <Login />
    }
}

export default Home