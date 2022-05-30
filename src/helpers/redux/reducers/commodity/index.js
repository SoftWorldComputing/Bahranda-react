import { commodity } from "../../types";
const {
  GET_COMMODITIES_SUCCESS,
  GET_COMMODITIES_FAILURE,
  INCREMENT_PAGENUM,
  GET_SINGLE_COMMODITY_SUCCESS,
  GET_SINGLE_COMMODITY_FAILURE,
  GET_RELATED_COMMODITIES_INDICATOR,
  GET_SINGLE_COMMODITY_INDICATOR,
  GET_RELATED_COMMODITIES_SUCCESS,
  GET_RELATED_COMMODITIES_FAILURE,
  PURCHASE_COMMODITY_INDICATOR,
  PURCHASE_COMMODITY_SUCCESS,
  PURCHASE_COMMODITY_FAILURE,
  GET_LATEST_COMMODITIES_FAILURE,
  GET_LATEST_COMMODITIES_SUCCESS,
  GET_LATEST_COMMODITIES_INDICATOR,
  CALCULATE_PRICE_FAILURE,
  CALCULATE_PRICE_SUCCESS,
  CALCULATE_PRICE_INDICATOR,
  PAY_FROM_WALLET_INDICATOR,
  PAY_FROM_WALLET_SUCCESS,
  PAY_FROM_WALLET_FAILURE,
} = commodity;
const initialState = {
  commodities: [],
  latestCommodities: [],
  pageNum: 1,
  hasNextPage: true,
  error: {
    singleCommodity: "",
    commodities: "",
    calculatePrice: "",
  },
  success: {
    purchaseCommodity: "",
  },
  isLoading: false,
  firstFetch: true,
  loadingIndicators: {
    singleCommodity: false,
    relatedCommodity: false,
    purchaseCommodity: false,
    getLatestCommodities: false,
    payFromWallet: false,
  },
};
const commodityReducer = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case GET_COMMODITIES_SUCCESS:
      const { commodities, pageNum, hasNextPage } = payload;
      prevState.commodities = [...prevState.commodities, ...commodities];
      if (prevState.firstFetch) prevState.firstFetch = false;
      return { ...prevState, pageNum, hasNextPage, isLoading: false };
    case GET_COMMODITIES_FAILURE:
      prevState.error.commodities = payload.error;
      return { ...prevState };
    case INCREMENT_PAGENUM:
      return { ...prevState, pageNum: prevState.pageNum + 1, isLoading: true };
    case GET_SINGLE_COMMODITY_INDICATOR:
      prevState.loadingIndicators.singleCommodity = true;
      return { ...prevState };
    case GET_SINGLE_COMMODITY_SUCCESS:
      prevState.loadingIndicators.singleCommodity = false;
      return { ...prevState };
    case GET_SINGLE_COMMODITY_FAILURE:
      prevState.loadingIndicators.singleCommodity = false;
      prevState.error.singleCommodity = payload.error;
      return { ...prevState };
    case GET_RELATED_COMMODITIES_INDICATOR:
      prevState.loadingIndicators.relatedCommodity = true;
      return { ...prevState };
    case GET_RELATED_COMMODITIES_SUCCESS:
      prevState.loadingIndicators.relatedCommodity = false;
      return { ...prevState };
    case GET_RELATED_COMMODITIES_FAILURE:
      prevState.loadingIndicators.relatedCommodity = false;
      return { ...prevState };
    case PURCHASE_COMMODITY_INDICATOR:
      prevState.loadingIndicators.purchaseCommodity = true;
      return { ...prevState };
    case PURCHASE_COMMODITY_SUCCESS:
      prevState.success.purchaseCommodity = payload.message;
      prevState.loadingIndicators.purchaseCommodity = false;
      return { ...prevState };
    case PURCHASE_COMMODITY_FAILURE:
      prevState.loadingIndicators.purchaseCommodity = false;
      return { ...prevState };
    case GET_LATEST_COMMODITIES_INDICATOR:
      prevState.loadingIndicators.getLatestCommodities = true;
      return { ...prevState };
    case GET_LATEST_COMMODITIES_SUCCESS:
      prevState.loadingIndicators.getLatestCommodities = false;
      prevState.latestCommodities = payload.commodities;
      return { ...prevState };
    case GET_LATEST_COMMODITIES_FAILURE:
      prevState.loadingIndicators.getLatestCommodities = false;
      return { ...prevState };
    case CALCULATE_PRICE_INDICATOR:
      prevState.loadingIndicators.calculatePrice = true;
      return { ...prevState };
    case CALCULATE_PRICE_SUCCESS:
      prevState.loadingIndicators.calculatePrice = false;
      return { ...prevState };
    case CALCULATE_PRICE_FAILURE:
      prevState.error.calculatePrice = payload.error;
      prevState.loadingIndicators.calculatePrice = false;
      return { ...prevState };
    case PAY_FROM_WALLET_INDICATOR:
      prevState.loadingIndicators.payFromWallet = true;
      return { ...prevState };
    case PAY_FROM_WALLET_SUCCESS:
      prevState.success.payFromWallet = payload.message;
      prevState.loadingIndicators.payFromWallet = false;
      return { ...prevState };
    case PAY_FROM_WALLET_FAILURE:
      prevState.error.payFromWallet = payload.error;
      prevState.loadingIndicators.payFromWallet = false;
      return { ...prevState };
    default:
      return prevState;
  }
};

export default commodityReducer;
