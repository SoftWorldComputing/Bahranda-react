import { auth, account } from '../../types';
const { SIGN_IN_SUCCESS, SIGN_OUT } = auth;

const {
  GET_ACCOUNT_DASHBOARD_SUCCESS,
  UPDATE_PROFILE_SUCCESS, CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE, GET_ACCOUNT_DASHBOARD_FAILURE,
  UPDATE_PROFILE_FAILURE, GET_ACCOUNT_DASHBOARD_INDICATOR,
  UPDATE_PROFILE_INDICATOR, CHANGE_PASSWORD_INDICATOR
} = account;

const initialState = () => {
  return {
    profile: {  },
    account_summary: '',
    monthly_expenditure: '',
    user_activities: [],
    errors: {
      get: '',
      updateProfile: '',
      changePassword: '',
      bankInfo: ''
    },
    success: {
      updateProfile: '',
      changePassword: '',
    },
    loadingIndicators: {
      updateProfile: false,
      changePassword: false,
      getDashboard: false
    }
  }
}
const accountReducer = (prevState = initialState(), { type, payload }) => {
  switch(type) {
    case SIGN_IN_SUCCESS:
      prevState.profile = payload.user;
      return {...prevState}
    case SIGN_OUT:
      return initialState();
    case GET_ACCOUNT_DASHBOARD_INDICATOR:
      prevState.loadingIndicators.getDashboard = true
      return {...prevState }
    case GET_ACCOUNT_DASHBOARD_SUCCESS:
      prevState.loadingIndicators.getDashboard = false
      return { ...prevState, ...payload.dashboard }
    case GET_ACCOUNT_DASHBOARD_FAILURE:
      prevState.loadingIndicators.getDashboard = false;
      return { ...prevState }
    case UPDATE_PROFILE_INDICATOR:
      return {...prevState, loadingIndicators: { ...prevState.loadingIndicators, updateProfile: true }}
    case UPDATE_PROFILE_SUCCESS:
      prevState.success.updateProfile = payload.message;
      prevState.loadingIndicators.updateProfile = false;
      const profile = {...prevState.profile, ...payload.profile}
      return { ...prevState, profile  };
    case UPDATE_PROFILE_FAILURE:
      prevState.loadingIndicators.updateProfile = false
      prevState.errors.updateProfile = payload.error;
      return prevState;
    case CHANGE_PASSWORD_INDICATOR:
      return {...prevState, loadingIndicators: { ...prevState.loadingIndicators, changePassword: true }}
    case CHANGE_PASSWORD_SUCCESS:
      prevState.success.changePassword = payload.message
      prevState.loadingIndicators.changePassword = false;
      return { ...prevState };
    case CHANGE_PASSWORD_FAILURE:
      prevState.errors.changePassword = payload.error;
      prevState.loadingIndicators.changePassword = false
      return {...prevState}
    default:
      return prevState;
  }
}

export default accountReducer;
