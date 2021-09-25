import React from 'react'
import { BrowserRouter as Router, Switch,Redirect } from 'react-router-dom'
import Feed from '../pages/Feed'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import PostIdea from '../pages/PostIdea'
import ProfilePage from '../pages/ProfilePage'
import Signup from '../pages/Signup'
import { routes } from '../utils/routeStrings'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'



const RoutingComp = () => {

  return (
    <Router>
      <Switch>
        {/* private routes */}
        <PrivateRoute exact path={routes.FEED} component={Feed} />
        <PrivateRoute exact path={routes.POST_IDEA} component={PostIdea} />
        <PrivateRoute exact path={routes.PROFILE} component={ProfilePage} />

        {/* landing page */}
        <PublicRoute path={routes.LANDING_PAGE} component={LandingPage} />

        {/* authentication routes */}
        <PublicRoute path={routes.LOGIN} component={Login} />
        <PublicRoute path={routes.SIGNUP} component={Signup} />
        <Redirect from="*" to={routes.FEED} />
      </Switch>
    </Router>
  )
}

export default RoutingComp