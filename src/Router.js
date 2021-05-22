import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './routes/Home'

function AppRouter(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" ><Home user={props.user} /></Route>
      </Switch>
    </Router>
  )
}

export default AppRouter