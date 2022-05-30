import { auth } from '../../types';
const {
  SIGN_UP_SUCCESS ,SIGN_IN_ERROR,
  SIGN_UP_ERROR, PIN_ERROR,
  ISLOADING, CONFIRM_PIN_SUCCESS,
  SIGN_IN_SUCCESS, SIGN_OUT,
  CHECK_PIN_SUCCESS, CHECK_PIN_FAILURE,
  FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS
} = auth;
const initialState = () => {
  return {
    token: '',
    isLoading: false,
    isLoggedIn: false,
    email: '',
    errors: {
      signIn: '',
      signUp: '',
      pin: '',
      checkPin: '',
      forgotPassword: ''
    },
    success: {
      checkPin: {
        email: '',
        pin: ''
      }
    },
    loadingIndicators: {
      checkPin: false
    }
  }
}
const authReducer = (prevState = initialState(), { type, payload }) => {
  switch(type) {
    case ISLOADING:
      prevState.errors = payload.isLoading === true ? {} : prevState.errors;
      prevState.isLoading = payload.isLoading;
      return { ...prevState, isLoading: payload.isLoading };
    case SIGN_UP_SUCCESS:
      return { ...prevState, isLoading: false, email: payload.email }
    case SIGN_IN_ERROR:
      prevState.errors.signIn = payload.error;
      return { ...prevState, isLoading: false }
    case SIGN_UP_ERROR:
      prevState.errors.signUp = payload.error;
      return { ...prevState, isLoading: false }
    case PIN_ERROR:
      prevState.errors.pin = payload.error;
      return { ...prevState, isLoading: false }
    case CONFIRM_PIN_SUCCESS:
      return { ...initialState(), token: prevState.token }
    case SIGN_IN_SUCCESS:
      return { ...initialState(), token: payload.token, isLoggedIn: true }
    case CHECK_PIN_SUCCESS:
      prevState.isLoading = false;
      prevState.email = '';
      prevState.success.checkPin = payload;
      return { ...prevState }
    case CHECK_PIN_FAILURE:
      prevState.errors.checkPin = payload.error;
      prevState.isLoading = false;
      return { ...prevState }
    case FORGOT_PASSWORD_SUCCESS:
      prevState.isLoading = false;
      prevState.email = payload.email;
      return { ...prevState }
    case FORGOT_PASSWORD_FAILURE:
      prevState.isLoading = false;
      prevState.errors.forgotPassword = payload.error;
      return { ...prevState }
    case RESET_PASSWORD_SUCCESS:
      prevState.isLoading = false;
      prevState.success.checkPin = {  };
      return { ...prevState }
    case RESET_PASSWORD_FAILURE:
      prevState.isLoading = false;
      return { ...prevState }
    case SIGN_OUT: {
      return initialState()
    }
    default:
      return prevState;
  }
}

export default authReducer
