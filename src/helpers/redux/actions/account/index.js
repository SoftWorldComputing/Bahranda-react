import { account } from '../../types';
const {
  UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS, CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS,
  GET_ACCOUNT_DASHBOARD_FAILURE, GET_ACCOUNT_DASHBOARD_REQUEST,
  GET_ACCOUNT_DASHBOARD_SUCCESS,
} = account;

export const changePasswordRequest = (data, token) => {
  return {
    type: CHANGE_PASSWORD_REQUEST,
    payload: { data, token }
  }
}

export const changePasswordSuccess = (message) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: { message }
  }
}

export const changePasswordFailure = (error) => {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    payload: { error }
  }
}

export const updateProfileRequest = (data, token) => {
  return {
    type: UPDATE_PROFILE_REQUEST,
    payload: { data, token }
  }
}

export const updateProfileSuccess = (profile, message) => {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: { profile, message }
  }
}

// export const updateProfileIndicator

export const updateProfileFailure = (error) => {
  return {
    type: UPDATE_PROFILE_FAILURE,
    payload: { error }
  }
}


export const getAccountDashboardRequest = (token) => {
  return {
    type: GET_ACCOUNT_DASHBOARD_REQUEST,
    payload: { token }
  }
}

export const getAccountDashboardSuccess = (dashboard) => {
  return {
    type: GET_ACCOUNT_DASHBOARD_SUCCESS,
    payload: { dashboard }
  }
}

export const getAccountDashboardFailure = (error) => {
  return {
    type: GET_ACCOUNT_DASHBOARD_FAILURE,
    payload: { error }
  }
}
