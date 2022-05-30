import { UI } from '../../types';
const { START_LOADING, STOP_LOADING, ERASE_NETWORK_ERROR, SHOW_NETWORK_ERROR } = UI;

export const startLoading = () => {
  return {
    type: START_LOADING
  }
}

export const stopLoading = () => {
  return {
    type: STOP_LOADING
  }
}

export const eraseNetworkError = () => {
  return {
    type: ERASE_NETWORK_ERROR
  }
}

export const showNetworkError = (dispatch) => {
  return {
    type: SHOW_NETWORK_ERROR,
    payload: { dispatch }
  }
}