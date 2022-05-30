import React, { useLayoutEffect, lazy, Suspense }from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { History, Spinners } from '../components';
import { Route } from 'react-router-dom';
import { actions } from '../helpers';
import { AccountInformation, WalletStatus, SetPin, WalletRequests as Requests } from './components';
const { walletActions: { getWalletRequest } } = actions;
const { SectionSpinner } = Spinners;
const WalletHistory = lazy(() => import('./WalletHistory'));
const WalletRequests = lazy(() => import('./WalletRequests'))
const Wallet = ({ getWalletRequest, token, loading, walletExists, hasPin, pinSuccess, match: { path } }) => {
  useLayoutEffect(() => {
    if(!walletExists) getWalletRequest(token)
  }, [walletExists, getWalletRequest, token])
  if(loading) return <SectionSpinner isLoading={loading} />
  return (
    <Suspense fallback={<Spinners.FullScreenSpinner isLoading={true} />}>
      <Route exact path={path} render={props => (
        <div>
          <h1 className="padding-bottom-sm font-lg">Wallet</h1>
          <WalletStatus />
          <AccountInformation />
         {(!hasPin || pinSuccess) && <SetPin />}
          <Requests />
          <History.default />
        </div>
      )} />
      <Route path={`${path}/history`} component={WalletHistory} />
      <Route path={`${path}/requests`} component={WalletRequests} />
    </Suspense>
  )
}
const mapTokenToProps = state => {
  const { token } = state.authReducer;
  const {
    wallet,
    loadingIndicators: { getWallet: loading },
    success: { setPin: pinSuccess }
  } = state.walletReducer;
  const { has_set_pin: hasPin } = wallet;
  return { token, loading, hasPin, pinSuccess, walletExists: Object.keys(wallet).length !== 0 }
}
const mapDispatchToProps = dispatch => 
  bindActionCreators({ getWalletRequest }, dispatch)

export default connect(mapTokenToProps, mapDispatchToProps)(Wallet);
