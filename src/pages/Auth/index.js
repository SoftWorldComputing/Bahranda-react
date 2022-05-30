import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './Signin';
import SignUp from './SignUp';
import ConfirmEmail from './ConfirmEmail';
import { Spinners } from '../../components';
import { PageWrapper } from '../components';
import './auth.scss'
import { connect } from 'react-redux';
const ResetPassword = lazy(() => import('./ResetPassword'))
const ForgotPassword = lazy(() => import('./ForgotPassword'));
const ForgotPasswordPin = lazy(() => import ('./ForgotPasswordPin'));

const { FullScreenSpinner } = Spinners;
const Auth = ({ isAuth, match: { path }, history: { goBack  } }) => {
  useEffect(() => {
    if(isAuth) goBack()
  }, [])
  return (
    <PageWrapper>
      <Switch>
        <Suspense fallback={<FullScreenSpinner isLoading={true} />} >
          <Route path={`${path}/signin`} component={SignIn} />
          <Route exact path={`${path}/register`} component={SignUp} />
          <Route exact path={`${path}/activate`} component={ConfirmEmail} />
          <Route exact path={`${path}/reset-password`} component={ResetPassword} />
          <Route exact path={`${path}/forgot-password`} component={ForgotPassword} />
          <Route exact path={`${path}/pin/verify`} component={ForgotPasswordPin} />
        </Suspense>
      </Switch>
    </PageWrapper>
  )
}

const mapStateToProps = state => {
  const { token, isLoggedIn } = state.authReducer;
  const isAuth = token && isLoggedIn
  return { isAuth }
}

export default connect(mapStateToProps, null)(Auth);
