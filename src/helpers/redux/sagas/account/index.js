import { call, put, takeLatest, spawn } from 'redux-saga/effects';
import { delay, networkError, unAuthenticatedError } from '../reusables';
import { account } from '../../types';
import { accountActions } from '../../actions';
import { getData, modifyData, apiKey } from '../ajax';
const {
  GET_ACCOUNT_DASHBOARD_REQUEST,
  UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_INDICATOR,
  CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_INDICATOR,
  GET_ACCOUNT_DASHBOARD_INDICATOR
} = account;
const {
  getAccountDashboardSuccess, getAccountDashboardFailure,
  changePasswordFailure, updateProfileFailure,
  changePasswordSuccess, updateProfileSuccess,
  changePasswordRequest, getAccountDashboardRequest,
  updateProfileRequest
} = accountActions;
const networkErrorMessage = 'No internet connection detected';
const accountDBCalls = {
  getAccountDashboard: async (token) => {
    const response = await getData(`${apiKey}/user/home`, token);
    return response.data
  },
  changePassword: async ({ data, token }) => {
    const response = await modifyData(`${apiKey}/user/profile/password/change`, data, token);
    return response
  },
  updateProfile: async ({ data, token }) => {
    const response = await modifyData(`${apiKey}/user/profile/update`, data, token);
    return response
  }
}

// All generators*
function* getAccountDashboard({ payload: { token } }) {
  try {
    yield put({ type: GET_ACCOUNT_DASHBOARD_INDICATOR })
    const dashboard = yield call(accountDBCalls.getAccountDashboard, token);
    yield put(getAccountDashboardSuccess(dashboard));
  } catch (err) {
    const { status, title } = err;
    yield call(unAuthenticatedError, err)
    if(!status) {
      yield call(networkError, getAccountDashboardRequest(token));
      return
    }
    const errorMessage = title
      ? title
      : networkErrorMessage
    yield put(getAccountDashboardFailure(errorMessage))
  }
}

function* updateProfile({ payload }) {
  try {
    yield put({ type: UPDATE_PROFILE_INDICATOR })
    yield call(accountDBCalls.updateProfile, payload);
    yield put(updateProfileSuccess(payload.data, 'Profile updated successfully'));
    yield call(delay, 3000)
    yield put(updateProfileSuccess(payload.data, ''));
  } catch (err) {
    const { title } = err;
    yield call(unAuthenticatedError, err);
    if(!title) {
      yield call(networkError, updateProfileRequest(payload.data, payload.token));
      return
    }
    const errorMessage = title
      ? title
      : networkErrorMessage
    yield put(updateProfileFailure(errorMessage));
    yield call(delay, 3000);
    yield put(updateProfileFailure(''));
  }
}

function* changePassword({ payload }) {
  try {
    yield put({ type: CHANGE_PASSWORD_INDICATOR })
    const { title } = yield call(accountDBCalls.changePassword, payload);
    yield put(changePasswordSuccess(title));
    yield call(delay, 3000)
    yield put(changePasswordSuccess(''));
  } catch (err) {
    const { status, title } = err;
    yield call(unAuthenticatedError, err);
    if(!status) {
      yield call(networkError, changePasswordRequest(payload.data, payload.token));
      return
    }
    const errorMessage = status
      ? title
      : networkErrorMessage
    yield put(changePasswordFailure(errorMessage));
    yield call(delay, 3000)
    yield put(changePasswordFailure(''));
  }
}

function* getAccountDashboardWatcher() {
  yield takeLatest(GET_ACCOUNT_DASHBOARD_REQUEST, getAccountDashboard)
}

function* updateProfileWatcher() {
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfile)
}

function* changePasswordWatcher() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword)
}

export default function* accountSagas() {
  yield spawn(getAccountDashboardWatcher)
  yield spawn(updateProfileWatcher)
  yield spawn(changePasswordWatcher)
}
