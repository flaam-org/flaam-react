import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import Alert from '../components/utilComponents/Alert'
import Feed from '../pages/Feed'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import PostIdea from '../pages/PostIdea'
import ProfilePage from '../pages/ProfilePage'
import Signup from '../pages/Signup'
import IdeaDetail from "../pages/IdeaDetail"
import { dequeueNotification, selectCurrentObject } from '../slices/globalNotificationSlice'
import { routes } from '../utils/routeStrings'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import SendResetToken from '../pages/SendResetToken'
import ResetPassword from '../pages/ResetPassword'



const RoutingComp = () => {

  const alertCurrentObject = useSelector(selectCurrentObject)
  const dispatch = useDispatch()


  return (
    <Router>

      <Alert
        message={alertCurrentObject?.msg}
        autoClose={true}
        duration={alertCurrentObject?.duration}
        onClose={() => dispatch(dequeueNotification())}
        variant={alertCurrentObject?.type}
        placement="right-end"
        corners="very-light-curve"
      />

      <Switch>
        {/* private routes */}
        <PrivateRoute exact path={routes.FEED} component={Feed} />
        <PrivateRoute exact path={routes.POST_IDEA} component={PostIdea} />
        <PrivateRoute exact path={routes.PROFILE} component={ProfilePage} />
        <PrivateRoute exact path={routes.IDEA_DETAIL()} component={IdeaDetail} />

        {/* landing page */}
        <PublicRoute exact path={routes.LANDING_PAGE} component={LandingPage} />

        {/* authentication routes */}
        <PublicRoute exact path={routes.LOGIN} component={Login} />
        <PublicRoute exact path={routes.SIGNUP} component={Signup} />

        <PublicRoute exact path={routes.SEND_RESET_TOKEN} component={SendResetToken} />
        <PublicRoute exact path={routes.RESET_PASSWORD} component={ResetPassword} />

        <Redirect from="*" to={routes.FEED} />
      </Switch>
    </Router>
  )
}

export default RoutingComp