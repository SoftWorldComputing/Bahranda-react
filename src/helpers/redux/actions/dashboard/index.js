import { dashboard } from '../../types';

const {
  GET_USER_DASHBOARD_FAILURE, GET_USER_DASHBOARD_REQUEST, GET_USER_DASHBOARD_SUCCESS
} = dashboard;

export const getUserDashboardRequest = (token) => {
  return {
    type: GET_USER_DASHBOARD_REQUEST,
    payload: { token }
  }
}

export const getUserDashboardSuccess = (dashboard) => {
  return {
    type: GET_USER_DASHBOARD_SUCCESS,
    payload: { dashboard }
  }
}

export const getUserDashboardFailure = (error) => {
  return {
    type: GET_USER_DASHBOARD_FAILURE,
    payload: { error }
  }
}
