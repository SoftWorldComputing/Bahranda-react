import { wallet } from "../../types";
const {
  GET_WALLET_FAILURE,
  GET_WALLET_REQUEST,
  GET_WALLET_SUCCESS,
  GET_WALLET_HISTORY_FAILURE,
  GET_WALLET_HISTORY_REQUEST,
  GET_WALLET_HISTORY_SUCCESS,
  REQUEST_WITHDRAWAL_FAILURE,
  REQUEST_WITHDRAWAL_REQUEST,
  REQUEST_WITHDRAWAL_SUCCESS,
  GET_WALLET_REQUESTS,
  GET_WALLET_REQUESTS_FAILURE,
  GET_WALLET_REQUESTS_SUCCESS,
  UPDATE_BANK_INFO_SUCCESS,
  UPDATE_BANK_INFO_REQUEST,
  UPDATE_BANK_INFO_FAILURE,
  SET_PIN_SUCCESS,
  SET_PIN_FAILURE,
  SET_PIN_REQUEST,
  INCREMENT_WALLET_HISTORY_PAGENUM,
  INCREMENT_WALLET_REQUESTS_PAGENUM,
  FUND_WALLET_FAILURE,
  FUND_WALLET_REQUEST,
  FUND_WALLET_SUCCESS,
  FUND_WALLET_INDICATOR
} = wallet;

export const getWalletRequest = (token) => {
  return {
    type: GET_WALLET_REQUEST,
    payload: { token },
  };
};

export const getWalletSuccess = (wallet) => {
  return {
    type: GET_WALLET_SUCCESS,
    payload: { wallet },
  };
};

export const getWalletFailure = (error) => {
  return {
    type: GET_WALLET_FAILURE,
    payload: { error },
  };
};

export const getWalletHistoryRequest = (pageNum, token) => {
  return {
    type: GET_WALLET_HISTORY_REQUEST,
    payload: { pageNum, token },
  };
};

export const getWalletHistorySuccess = (
  walletHistory,
  pageNum,
  hasNextPage
) => {
  return {
    type: GET_WALLET_HISTORY_SUCCESS,
    payload: { walletHistory, pageNum, hasNextPage },
  };
};

export const getWalletHistoryFailure = (error) => {
  return {
    type: GET_WALLET_HISTORY_FAILURE,
    payload: { error },
  };
};

export const incrementWalletHistoryPageNum = () => {
  return {
    type: INCREMENT_WALLET_HISTORY_PAGENUM,
  };
};

export const requestWithdrawalRequest = (data, token) => {
  return {
    type: REQUEST_WITHDRAWAL_REQUEST,
    payload: { data, token },
  };
};

export const requestWithdrawalSuccess = (message) => {
  return {
    type: REQUEST_WITHDRAWAL_SUCCESS,
    payload: { message },
  };
};

export const requestWithdrawalFailure = (error) => {
  return {
    type: REQUEST_WITHDRAWAL_FAILURE,
    payload: { error },
  };
};

export const getWalletRequests = (pageNum, token) => {
  return {
    type: GET_WALLET_REQUESTS,
    payload: { token, pageNum },
  };
};

export const getWalletRequestsSuccess = (requests, pageNum, hasNextPage) => {
  return {
    type: GET_WALLET_REQUESTS_SUCCESS,
    payload: { requests, pageNum, hasNextPage },
  };
};

export const getWalletRequestsFailure = (error) => {
  return {
    type: GET_WALLET_REQUESTS_FAILURE,
    payload: { error },
  };
};

export const incrementWalletRequestsPageNum = () => {
  return {
    type: INCREMENT_WALLET_REQUESTS_PAGENUM,
  };
};

export const updateBankInfoRequest = (data, token) => {
  return {
    type: UPDATE_BANK_INFO_REQUEST,
    payload: { data, token },
  };
};

export const updateBankInfoSuccess = (bankInfo, message) => {
  return {
    type: UPDATE_BANK_INFO_SUCCESS,
    payload: { bankInfo, message },
  };
};

export const updateBankInfoFailure = (error) => {
  return {
    type: UPDATE_BANK_INFO_FAILURE,
    payload: { error },
  };
};

export const setPinRequest = (data, token) => {
  return {
    type: SET_PIN_REQUEST,
    payload: { data, token },
  };
};

export const setPinSuccess = (message) => {
  return {
    type: SET_PIN_SUCCESS,
    payload: { message },
  };
};

export const setPinFailure = (error) => {
  return {
    type: SET_PIN_FAILURE,
    payload: { error },
  };
};

export const fundWalletRequest = (data, token) => {
  return {
    type: FUND_WALLET_REQUEST,
    payload: { data, token },
  };
};

export const fundWalletSuccess = (message) => {
  return {
    type: FUND_WALLET_SUCCESS,
    payload: { message },
  };
};

export const fundWalletFailure = (error) => {
  return {
    type: FUND_WALLET_FAILURE,
    payload: { error },
  };
};
