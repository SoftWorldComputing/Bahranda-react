import { wallet, auth } from "../../types";

const {
  GET_WALLET_SUCCESS,
  SET_PIN_SUCCESS,
  GET_WALLET_HISTORY_SUCCESS,
  GET_WALLET_REQUESTS_SUCCESS,
  GET_WALLET_FAILURE,
  GET_WALLET_HISTORY_FAILURE,
  REQUEST_WITHDRAWAL_FAILURE,
  REQUEST_WITHDRAWAL_SUCCESS,
  REQUEST_WITHDRAWAL_INDICATOR,
  GET_WALLET_REQUESTS_FAILURE,
  SET_PIN_FAILURE,
  UPDATE_BANK_INFO_FAILURE,
  UPDATE_BANK_INFO_INDICATOR,
  UPDATE_BANK_INFO_SUCCESS,
  GET_WALLET_INDICATOR,
  GET_WALLET_HISTORY_INDICATOR,
  SET_PIN_INDICATOR,
  INCREMENT_WALLET_HISTORY_PAGENUM,
  INCREMENT_WALLET_REQUESTS_PAGENUM,
  GET_WALLET_REQUESTS_INDICATOR,
  FUND_WALLET_INDICATOR,
  FUND_WALLET_FAILURE,
  FUND_WALLET_SUCCESS,
} = wallet;

const { SIGN_OUT } = auth;

const initialState = () => {
  return {
    wallet: {},
    bankInfo: {},
    historyData: {
      history: [],
      pageNum: 1,
      hasNextPage: true,
    },
    walletRequestsData: {
      walletRequests: [],
      pageNum: 1,
      hasNextPage: true,
    },
    errors: {
      getWallet: "",
      history: "",
      bankInfo: "",
      setPin: "",
      requestWithdrawal: "",
    },
    success: {
      setPin: "",
      requestWithdrawal: "",
    },
    loadingIndicators: {
      bankInfo: false,
      getWallet: false,
      history: false,
      walletRequests: false,
      setPin: false,
      requestWithdrawal: false,
      fundWallet: false,
    },
  };
};
const walletReducer = (prevState = initialState(), { type, payload }) => {
  switch (type) {
    case GET_WALLET_INDICATOR:
      prevState.loadingIndicators.getWallet = true;
      return { ...prevState };
    case GET_WALLET_SUCCESS:
      prevState.loadingIndicators.getWallet = false;
      const { bank_details: bankInfo, ...rest } = payload.wallet;
      return { ...prevState, bankInfo, wallet: rest };
    case GET_WALLET_FAILURE:
      prevState.errors.getWallet = payload.error;
      prevState.loadingIndicators.getWallet = false;
      return { ...prevState };
    case SET_PIN_INDICATOR:
      prevState.loadingIndicators.setPin = true;
      return { ...prevState };
    case SET_PIN_SUCCESS:
      prevState.loadingIndicators.setPin = false;
      prevState.success.setPin = payload.message;
      return { ...prevState };
    case SET_PIN_FAILURE:
      prevState.loadingIndicators.setPin = false;
      prevState.errors.setPin = payload.error;
      return { ...prevState };
    case GET_WALLET_HISTORY_INDICATOR:
      prevState.loadingIndicators.history = true;
      return { ...prevState };
    case INCREMENT_WALLET_HISTORY_PAGENUM:
      prevState.historyData.pageNum += 1;
      return { ...prevState };
    case GET_WALLET_HISTORY_SUCCESS:
      const { walletHistory, pageNum, hasNextPage } = payload;
      const history = [...prevState.historyData.history, ...walletHistory];
      prevState.historyData = {
        pageNum,
        hasNextPage,
        history,
      };
      prevState.loadingIndicators.history = false;
      return { ...prevState };
    case GET_WALLET_HISTORY_FAILURE:
      prevState.loadingIndicators.history = false;
      prevState.errors.history = payload.error;
      return { ...prevState };
    case GET_WALLET_REQUESTS_INDICATOR:
      prevState.loadingIndicators.walletRequests = true;
      return { ...prevState };
    case INCREMENT_WALLET_REQUESTS_PAGENUM:
      prevState.walletRequestsData.pageNum += 1;
      return { ...prevState };
    case GET_WALLET_REQUESTS_SUCCESS: {
      const { requests, pageNum, hasNextPage } = payload;
      const walletRequests = [
        ...prevState.walletRequestsData.walletRequests,
        ...requests,
      ];
      prevState.walletRequestsData = {
        pageNum,
        hasNextPage,
        walletRequests,
      };
      prevState.loadingIndicators.walletRequests = false;
      return { ...prevState };
    }
    case GET_WALLET_REQUESTS_FAILURE:
      prevState.loadingIndicators.walletRequests = false;
      return { ...prevState };
    case UPDATE_BANK_INFO_INDICATOR:
      prevState.loadingIndicators.bankInfo = true;
      return { ...prevState };
    case UPDATE_BANK_INFO_SUCCESS:
      prevState.loadingIndicators.bankInfo = false;
      prevState.success.bankInfo = payload.message;
      const { account_name, account_no, bank_name } = payload.bankInfo;
      prevState.bankInfo = { account_name, account_no, bank_name };
      return { ...prevState };
    case UPDATE_BANK_INFO_FAILURE:
      prevState.loadingIndicators.bankInfo = false;
      prevState.errors.bankInfo = payload.error;
      return { ...prevState };
    case REQUEST_WITHDRAWAL_INDICATOR:
      prevState.loadingIndicators.requestWithdrawal = true;
      return { ...prevState };
    case REQUEST_WITHDRAWAL_SUCCESS:
      prevState.success.requestWithdrawal = payload.message;
      prevState.loadingIndicators.requestWithdrawal = false;
      return { ...prevState };
    case REQUEST_WITHDRAWAL_FAILURE:
      prevState.errors.requestWithdrawal = payload.error;
      prevState.loadingIndicators.requestWithdrawal = false;
      return { ...prevState };
    case FUND_WALLET_INDICATOR:
      prevState.loadingIndicators.fundWallet = true;
      return { ...prevState };
    case FUND_WALLET_FAILURE:
      prevState.errors.fundWallet = payload.error;
      prevState.loadingIndicators.fundWallet = false;
      return { ...prevState };
    case FUND_WALLET_SUCCESS:
      prevState.success.fundWallet = payload.message;
      prevState.loadingIndicators.fundWallet = false;
      return { ...prevState };
    case SIGN_OUT:
      return initialState();
    default:
      return prevState;
  }
};

export default walletReducer;
