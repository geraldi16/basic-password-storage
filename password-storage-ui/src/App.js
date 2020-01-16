import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom"

import Home from './page/Home'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/auth/:authType" component={Home}/>
        <Redirect to="/auth/login"/>
      </Switch>
    </div>
  );
}

export default App;
