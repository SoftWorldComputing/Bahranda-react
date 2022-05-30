import React, { memo, useLayoutEffect } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../helpers';
import { FullScreenSpinner } from '../Spinners';
const { authActions: { getUserProfile }, UIActions: { startLoading } } = actions;
const ProtectedRoute = memo(({
  component: Comp, auth, token, isLoggedIn, isLoading, startLoading, getUserProfile, path, location, redirectPath = '/auth/login', ...rest
}) => {
  useLayoutEffect(() => {
    if(token && !isLoggedIn) getUserProfile(token);
  }, [isLoggedIn, token, getUserProfile]);
  if(isLoading || (token && !isLoggedIn)) return <FullScreenSpinner isLoading={isLoading} />
  return(
    <Route 
      path={path}
      {...rest}
      render={props => {
        return token && isLoggedIn ? (
        <Comp {...props} token={token} />
        ) :  (
        <Redirect to={{
          pathname: redirectPath,
          state: {
            prevLocation: location.pathname,
            error: "UnAuthorized Access!",
          }
        }}
        />
        )
      }}
    />
  )
})

const mapTokenToProps = state => {
  const { token, isLoggedIn } = state.authReducer;
  const { isLoading } = state.UIReducer;
  return { token, isLoggedIn, isLoading }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserProfile, startLoading }, dispatch)
export default connect(mapTokenToProps, mapDispatchToProps)(withRouter(ProtectedRoute))
