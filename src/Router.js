import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './routes/Home'
import Admin from 'routes/Admin';
import Report from 'routes/Report';

function AppRouter(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" ><Home user={props.user} /></Route>

        <Route exact path="/admin/" ><Admin user={props.user} /></Route>
        <Route path="/admin/:startComponent/:id" ><Admin user={props.user} /></Route>
        <Route path="/admin/:startComponent" ><Admin user={props.user} /></Route>

        <Route path="/report" ><Report user={props.user} /></Route>

        <Route path="/:pageName/:property1/:property2" ><Home user={props.user} /></Route>
        <Route path="/:pageName/:property1" ><Home user={props.user} /></Route>
        <Route path="/:pageName" ><Home user={props.user} /></Route>
      </Switch>
    </Router>
  )
}

export default AppRouter