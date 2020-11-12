import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {Admin} from './views/Admin'
import {SignUp} from './views/SignUp'
import SignIn from './views/SignIn'
import {Account} from './views/Account'
import {Home} from './views/Home'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin/>
        </Route>
        <Route path="/signup">
          <SignUp/>
        </Route>
        <Route path="/signin">
          <SignIn/>
        </Route>
        <Route path="/account">
          <Account/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
