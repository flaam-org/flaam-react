import React from 'react'
// import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PublicRoute = ({ component: Component, ...rest }) => {

  const isLoggedIn = true

  /**
   *            NEEDED FUNCTIONALITY
   *
   * if the user is logged in redirect to the '/'
   */

  //



  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn ? <Redirect to="/" /> : <Component {...props} />
      }}
    ></Route>
  )
}


export default PublicRoute