import { call, put, takeLatest, spawn } from "redux-saga/effects";
import { wallet } from "../../types";
import { walletActions } from "../../actions";
import { sendData, getData, modifyData, apiKey } from "../ajax";
import { delay, unAuthenticatedError, networkError } from "../reusables";
import {
  fundWalletFailure,
  fundWalletRequest,
  fundWalletSuccess,
} from "../../actions/wallet";
const {
  UPDATE_BANK_INFO_REQUEST,
  GET_WALLET_HISTORY_REQUEST,
  REQUEST_WITHDRAWAL_REQUEST,
  GET_WALLET_REQUESTS,
  GET_WALLET_REQUEST,
  SET_PIN_REQUEST,
  FUND_WALLET_REQUEST,
  UPDATE_BANK_INFO_INDICATOR,
  GET_WALLET_INDICATOR,
  GET_WALLET_HISTORY_INDICATOR,
  REQUEST_WITHDRAWAL_INDICATOR,
  SET_PIN_INDICATOR,
  GET_WALLET_REQUESTS_INDICATOR,
  FUND_WALLET_INDICATOR,
} = wallet;
const {
  getWalletFailure,
  getWalletSuccess,
  getWalletHistoryFailure,
  getWalletHistorySuccess,
  getWalletRequestsFailure,
  getWalletRequestsSuccess,
  requestWithdrawalSuccess,
  requestWithdrawalFailure,
  updateBankInfoFailure,
  updateBankInfoSuccess,
  setPinSuccess,
  setPinFailure,
  getWalletHistoryRequest,
  getWalletRequest,
  getWalletRequests: fetchWalletRewuests,
  requestWithdrawalRequest,
  setPinRequest,
  updateBankInfoRequest,
} = walletActions;

const networkErrorMessage = "No internet connection detected";
const walletDBCalls = {
  getWallet: async (token) => {
    const response = await getData(`${apiKey}/user/wallet`, token);
    return response;
  },
  getWalletHistory: async ({ pageNum, token }) => {
    const response = await getData(
      `${apiKey}/user/wallet/wallet-history?page=${pageNum}`,
      token
    );
    return response.wallet_histories;
  },
  getWalletRequests: async ({ pageNum, token }) => {
    const response = await getData(
      `${apiKey}/user/wallet/wallet-requests?page=${pageNum}`,
      token
    );
    return response.wallet_requests;
  },
  requestWithdrawal: async ({ data, token }) => {
    const response = await sendData(
      `${apiKey}/user/wallet/request-withdrawal`,
      data,
      token
    );
    return response;
  },
  setPin: async ({ data, token }) => {
    const response = await modifyData(
      `${apiKey}/user/wallet/set-pin`,
      data,
      token
    );
    return response;
  },
  updateBankInfo: async ({ data, token }) => {
    const response = await modifyData(
      `${apiKey}/user/wallet/account-information`,
      data,
      token
    );
    return response;
  },
  fundWallet: async ({ data, token }) => {
    const response = await sendData(
      `${apiKey}/user/wallet/fund-wallet`,
      data,
      token
    );
    return response;
  },
};

// All generators*
function* getWallet({ payload: { token } }) {
  try {
    yield put({ type: GET_WALLET_INDICATOR });
    const { wallet_details } = yield call(walletDBCalls.getWallet, token);
    yield put(getWalletSuccess(wallet_details));
  } catch (err) {
    yield call(unAuthenticatedError, err);
    const { title } = err;
    if (!title) {
      yield call(networkError, getWalletRequest(token));
      return;
    }
    const errorMessage = title ? title : networkErrorMessage;
    yield put(getWalletFailure(errorMessage));
  }
}

function* getWalletHistory({ payload }) {
  try {
    yield put({ type: GET_WALLET_HISTORY_INDICATOR });
    const { current_page, data: history } = yield call(
      walletDBCalls.getWalletHistory,
      payload
    );
    const hasNextPage = history.length !== 0;
    yield put(getWalletHistorySuccess(history, current_page, hasNextPage));
  } catch (err) {
    yield call(unAuthenticatedError, err);
    const { title } = err;
    if (!title) {
      yield call(
        networkError,
        getWalletHistoryRequest(payload.pageNum, payload.token)
      );
      return;
    }
    const errorMessage = title ? title : networkErrorMessage;
    yield put(getWalletHistoryFailure(errorMessage));
  }
}

function* getWalletRequests({ payload }) {
  try {
    yield put({ type: GET_WALLET_REQUESTS_INDICATOR });
    const { data: requests, current_page } = yield call(
      walletDBCalls.getWalletRequests,
      payload
    );
    const hasNextPage = requests.length !== 0;
    yield put(getWalletRequestsSuccess(requests, current_page, hasNextPage));
  } catch (err) {
    yield call(unAuthenticatedError, err);
    const { status, title } = err;
    if (!title) {
      yield call(
        networkError,
        fetchWalletRewuests(payload.pageNum, payload.token)
      );
      return;
    }
    const errorMessage = status ? title : networkErrorMessage;
    yield put(getWalletRequestsFailure(errorMessage));
  }
}

function* requestWithdrawal({ payload }) {
  try {
    yield put({ type: REQUEST_WITHDRAWAL_INDICATOR });
    const { title } = yield call(walletDBCalls.requestWithdrawal, payload);
    yield put(requestWithdrawalSuccess(title));
  } catch (err) {
    const { status, title } = err;
    yield call(unAuthenticatedError, err);
    if (!title) {
      yield call(
        networkError,
        requestWithdrawalRequest(payload.data, payload.token)
      );
      return;
    }
    const errorMessage = status ? title : networkErrorMessage;
    yield put(requestWithdrawalFailure(errorMessage));
    yield call(delay, 4000);
    yield put(requestWithdrawalFailure(""));
  }
}

function* setPin({ payload }) {
  try {
    yield put({ type: SET_PIN_INDICATOR });
    const { title } = yield call(walletDBCalls.setPin, payload);
    yield put(setPinSuccess(title));
    yield call(delay, 4000);
    yield put(setPinSuccess(""));
  } catch (err) {
    const { status, title } = err;
    yield call(unAuthenticatedError, err);
    if (!title) {
      yield call(networkError, setPinRequest(payload.data, payload.token));
      return;
    }
    const errorMessage = status ? title : networkErrorMessage;
    yield put(setPinFailure(errorMessage));
    yield call(delay, 4000);
    yield put(setPinFailure(""));
  }
}

function* updateBankInfo({ payload }) {
  try {
    yield put({ type: UPDATE_BANK_INFO_INDICATOR });
    yield call(walletDBCalls.updateBankInfo, payload);
    yield put(
      updateBankInfoSuccess(
        payload.data,
        "Account information updated successfully"
      )
    );
    yield call(delay, 4000);
    yield put(updateBankInfoSuccess(payload.data, ""));
  } catch (err) {
    yield call(unAuthenticatedError, err);
    const { status, title } = err;
    if (!title) {
      yield call(
        networkError,
        updateBankInfoRequest(payload.data, payload.token)
      );
      return;
    }
    const errorMessage = status ? title : networkErrorMessage;
    yield put(updateBankInfoFailure(errorMessage));
    yield call(delay, 4000);
    yield put(updateBankInfoFailure(""));
  }
}

function* fundWallet({ payload }) {
  try {
    yield put({ type: FUND_WALLET_INDICATOR });
    yield call(walletDBCalls.fundWallet, payload);
    yield put(fundWalletSuccess("Your wallet has successfully been funded"));
    yield call(delay, 1000);
    yield put(fundWalletSuccess(""));
  } catch (err) {
    yield call(unAuthenticatedError, err);
    const { status, title } = err;
    if (!title) {
      yield call(networkError, fundWalletRequest(payload.data, payload.token));
      return;
    }
    const errorMessage = status ? title : networkErrorMessage;
    yield put(fundWalletFailure(errorMessage));
    yield call(delay, 4000);
    yield put(fundWalletFailure(""));
  }
}

function* updateBankInfoWatcher() {
  yield takeLatest(UPDATE_BANK_INFO_REQUEST, updateBankInfo);
}

function* getWalletWatcher() {
  yield takeLatest(GET_WALLET_REQUEST, getWallet);
}

function* getWalletRequestsWatcher() {
  yield takeLatest(GET_WALLET_REQUESTS, getWalletRequests);
}

function* getWalletHistoryWatcher() {
  yield takeLatest(GET_WALLET_HISTORY_REQUEST, getWalletHistory);
}

function* requestWithdrawalWatcher() {
  yield takeLatest(REQUEST_WITHDRAWAL_REQUEST, requestWithdrawal);
}
function* setPinWatcher() {
  yield takeLatest(SET_PIN_REQUEST, setPin);
}
function* fundWalletWatcher() {
  yield takeLatest(FUND_WALLET_REQUEST, fundWallet);
}

export default function* walletSagas() {
  yield spawn(updateBankInfoWatcher);
  yield spawn(getWalletWatcher);
  yield spawn(getWalletHistoryWatcher);
  yield spawn(getWalletRequestsWatcher);
  yield spawn(requestWithdrawalWatcher);
  yield spawn(setPinWatcher);
  yield spawn(fundWalletWatcher);
}
