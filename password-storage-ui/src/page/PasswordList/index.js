import React from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../Header'

class PasswordList extends React.Component {
    render() {
        return (
            <div>
                <Header {...this.props} />
            </div>
        )
    }
}

export default withRouter(PasswordList)