import { auth } from '../../types';

const {
  SIGN_IN_REQUEST, SIGN_UP_REQUEST,
  SIGN_IN_SUCCESS, SIGN_UP_SUCCESS,
  SIGN_IN_ERROR, SIGN_UP_ERROR,
  PIN_ERROR, CONFIRM_PIN,
  ISLOADING, CONFIRM_PIN_SUCCESS,
  SIGN_OUT, GET_USER_PROFILE,
  CHECK_PIN_REQUEST, CHECK_PIN_FAILURE,
  CHECK_PIN_SUCCESS, RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE
} = auth;


export const signInRequest = (data, redirect, redirectPath) => {
  return {
    type: SIGN_IN_REQUEST,
    payload: { data, redirect, redirectPath}
  }
}

export const signInSuccess = (user, token) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: { user, token }
  }
}

export const signInError = (error) => {
  return {
    type: SIGN_IN_ERROR,
    payload: { error }
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const signUpRequest = (data, redirect) => {
  return {
    type: SIGN_UP_REQUEST,
    payload: { data, redirect }
  }
}

export const signUpSuccess = (email) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: { email }
  }
}

export const signUpError = (error) => {
  return {
    type: SIGN_UP_ERROR,
    payload: { error }
  }
}

export const confirmPin = (data, redirect) => {
  return {
    type: CONFIRM_PIN,
    payload: { data, redirect }
  }
}

export const confirmPinSuccess = () => {
  return {
    type: CONFIRM_PIN_SUCCESS,
  }
}

export const pinError = (error) => {
  return {
    type: PIN_ERROR,
    payload: { error }
  }
}



export const setIsLoading = (isLoading) => {
  return {
    type: ISLOADING,
    payload: { isLoading }
  }
}

export const getUserProfile = (token) => {
  return {
    type: GET_USER_PROFILE,
    payload: { token }
  }
}

export const checkPinRequest = (data, redirect) => {
  return {
    type: CHECK_PIN_REQUEST,
    payload: { data, redirect }
  }
}

export const checkPinSuccess = (email, pin) => {
  return {
    type: CHECK_PIN_SUCCESS,
    payload: { email, pin }
  }
}

export const checkPinFailure = (error) => {
  return {
    type: CHECK_PIN_FAILURE,
    payload: { error }
  }
}

export const resetPasswordRequest = (data, redirect) => {
  return {
    type: RESET_PASSWORD_REQUEST,
    payload: { data, redirect }
  }
}

export const resetPasswordSuccess = () => {
  return {
    type: RESET_PASSWORD_SUCCESS,
  }
}

export const resetPasswordFailure = (error) => {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: { error }
  }
}

export const forgotPasswordRequest = (data, redirect) => {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    payload: {data, redirect}
  }
}

export const forgotPasswordSuccess = (email) => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: { email }
  }
}

export const forgotPasswordFailure = (error) => {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    payload: { error }
  }
}
