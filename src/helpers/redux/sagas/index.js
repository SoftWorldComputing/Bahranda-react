import { spawn } from 'redux-saga/effects';
import authSagas from './auth';
import accountSagas from './account';
import commoditySagas from './commodities';
import walletSagas from './wallet';
import dealSagas from './deal';
import otherSagas from './others'
export default function* rootSaga() {
  yield spawn(authSagas)
  yield spawn(accountSagas)
  yield spawn(commoditySagas)
  yield spawn(walletSagas)
  yield spawn(dealSagas)
  yield spawn(otherSagas)
}
