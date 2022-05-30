import { deal } from '../../types';
const {
  GET_DEALS_FAILURE, GET_DEALS_REQUEST,
  GET_DEALS_SUCCESS,
  GET_SINGLE_DEAL_FAILURE, GET_SINGLE_DEAL_REQUEST,
  GET_SINGLE_DEAL_SUCCESS, GET_SINGLE_DEAL_INDICATOR
} = deal;

export const getDealsRequest = (token) => {
  return {
    type: GET_DEALS_REQUEST,
    payload: { token }
  }
}

export const getDealsSuccess = (deals) => {
  return {
    type: GET_DEALS_SUCCESS,
    payload: { deals }
  }
}

export const getDealsFailure = (error) => {
  return {
    type: GET_DEALS_FAILURE,
    payload: { error }
  }
}

export const getSingleDealRequest = (token, setState, id) => {
  return {
    type: GET_SINGLE_DEAL_REQUEST,
    payload: { token, setState, id }
  }
}

export const getSingleDealSuccess = () => {
  return {
    type: GET_SINGLE_DEAL_SUCCESS
  }
}

export const getSingleDealFailure = (error) => {
  return {
    type: GET_SINGLE_DEAL_FAILURE,
    payload: { error }
  }
}

export const getSingleDealIndicator = () => {
  return {
    type: GET_SINGLE_DEAL_INDICATOR
  }
}