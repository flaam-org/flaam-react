import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Feed from '../pages/Feed'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import { routes } from '../utils/routeStrings'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'



const RoutingComp = () => {

  return (
    <Router>
      <Switch>
        {/* private routes */}
        <PrivateRoute exact path="/" component={Feed} />

        {/* landing page */}
        <PublicRoute path={routes.LANDING_PAGE} component={LandingPage} />

        {/* authentication routes */}
        <PublicRoute path={routes.LOGIN} component={Login} />
        <PublicRoute path={routes.SIGNUP} component={Signup} />
      </Switch>
    </Router>
  )
}

export default RoutingComp