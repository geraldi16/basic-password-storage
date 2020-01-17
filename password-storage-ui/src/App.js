import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom"

import Home from './page/Home'
import PasswordList from './page/PasswordList'
import { isAuthenticated } from './utils/tokenHelper'

class App extends React.Component {
  state = {
    authenticated: isAuthenticated()
  }

  updateAuthenticated = () => {
    this.setState({
      authenticated: isAuthenticated()
    })
  }
  render() {
    const {authenticated} = this.state

    return (
      <div className="App">
        <Switch>
          <Route 
            path="/auth/:authType" 
            render={props => !authenticated ?
              <Home updateAuthenticated={()=>this.updateAuthenticated()} {...props}/> 
              : <Redirect to="/list-page"/>
            }
          />
          <Route 
            path="/list-page" 
            render={props => authenticated ? 
              <PasswordList updateAuthenticated={()=>this.updateAuthenticated()} {...props}/> 
              : <Redirect to="/auth/login"/>
            }
          />
          <Redirect to={authenticated ? "/list-page" : "/auth/login"}/>
        </Switch>
      </div>
    );
  }
}

export default App;
