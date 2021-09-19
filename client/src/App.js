import React from 'react';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/register' exact>
          <Register />
        </Route>
        <Route path = '/' exact>
          <p>Go to localhost:3000/login for login</p>
          <p>Go to localhost:3000/register for register</p>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;