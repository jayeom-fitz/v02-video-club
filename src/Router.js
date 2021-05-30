import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './routes/Home'
import Admin from 'routes/Admin';

function AppRouter(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" ><Home user={props.user} /></Route>

        <Route exact path="/admin/" ><Admin user={props.user} /></Route>
        <Route path="/admin/:startComponent/:id" ><Admin user={props.user} /></Route>
        <Route path="/admin/:startComponent" ><Admin user={props.user} /></Route>

        <Route path="/:pageName/:code" ><Home user={props.user} /></Route>
        <Route path="/:pageName" ><Home user={props.user} /></Route>
      </Switch>
    </Router>
  )
}

export default AppRouter