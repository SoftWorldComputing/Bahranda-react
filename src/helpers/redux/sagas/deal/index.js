import { call, put, takeLatest, spawn } from 'redux-saga/effects';
import { deal } from '../../types';
import { dealActions } from '../../actions';
import { getData, apiKey } from '../ajax';
import { unAuthenticatedError, networkError } from '../reusables';
const {
  GET_DEALS_INDICATOR, GET_DEALS_REQUEST,
  GET_SINGLE_DEAL_REQUEST,
} = deal;

const {
  getDealsFailure, getDealsSuccess, getDealsRequest,
  getSingleDealRequest, getSingleDealFailure, getSingleDealSuccess
} = dealActions;

const networkErrorMessage = 'No internet connection detected';
const dealDBCalls = {
  getDeals: async ({ token }) => {
    const { deals } = await getData(`${apiKey}/user/deals/all`, token);
    return deals
  },
  getSingleDeal: async ({ id, token }) => {
    const data = await getData(`${apiKey}/user/deals/${id}/show`, token);
    return data
  }
}

// All generators*
function* getDeals({ payload }) {
  try {
    yield put({ type: GET_DEALS_INDICATOR })
    const deals = yield call(dealDBCalls.getDeals, payload);
    yield put(getDealsSuccess(deals));
  } catch (err) {
    yield call(unAuthenticatedError, err)
    const { status, title } = err;
    if(!status) {
      yield call(networkError, getDealsRequest(payload.token));
      return
    }
    const errorMessage = status
      ? title
      : networkErrorMessage
    yield put(getDealsFailure(errorMessage))
  }
}

function* getSingleDeal({ payload: { token, setState, id } }) {
  try {
    const { deal } = yield call(dealDBCalls.getSingleDeal, {token, id});
    setState(deal);
    yield put(getSingleDealSuccess())
  } catch (err) {
    yield call(unAuthenticatedError, err)
    const { status } = err;
    if(!status) {
      yield call(networkError, getSingleDealRequest(token, setState, id));
      return
    }
    const errorMessage = status && status === 404
      ? status
      : networkErrorMessage
    yield put(getSingleDealFailure(errorMessage))
  }
}


function* getDealsWatcher() {
  yield takeLatest(GET_DEALS_REQUEST, getDeals)
}

function* getSingleDealWatcher() {
  yield takeLatest(GET_SINGLE_DEAL_REQUEST, getSingleDeal)
}


export default function* dealSagas() {
  yield spawn(getDealsWatcher)
  yield spawn(getSingleDealWatcher)
}