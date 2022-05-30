export const UI = {
  START_LOADING: "START_LOADING",
  STOP_LOADING: "STOP_LOADING",
  SHOW_NETWORK_ERROR: "SHOW_NETWORK_ERROR",
  ERASE_NETWORK_ERROR: "ERASE_NETWORK_ERROR",
};

export const account = {
  UPDATE_PROFILE_REQUEST: "UPDATE_PROFILE_REQUEST",
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_FAILURE: "UPDATE_PROFILE_FAILURE",
  UPDATE_PROFILE_INDICATOR: "UPDATE_PROFILE_INDICATOR",
  CHANGE_PASSWORD_REQUEST: "CHANGE_PASSWORD_REQUEST",
  CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_FAILURE: "CHANGE_PASSWORD_FAILURE",
  CHANGE_PASSWORD_INDICATOR: "CHANGE_PASSWORD_INDICATOR",
  GET_ACCOUNT_DASHBOARD_REQUEST: "GET_ACCOUNT_DASHBOARD_REQUEST",
  GET_ACCOUNT_DASHBOARD_SUCCESS: "GET_ACCOUNT_DASHBOARD_SUCCESS",
  GET_ACCOUNT_DASHBOARD_FAILURE: "GET_ACCOUNT_DASHBOARD_FAILURE",
  GET_ACCOUNT_DASHBOARD_INDICATOR: "GET_ACCOUNT_DASHBOARD_INDICATOR",
};

export const wallet = {
  GET_WALLET_REQUEST: "GET_WALLET_REQUEST",
  GET_WALLET_SUCCESS: "GET_WALLET_SUCCESS",
  GET_WALLET_FAILURE: "GET_WALLET_FAILURE",
  GET_WALLET_INDICATOR: "GET_WALLET_INDICATOR",
  GET_WALLET_HISTORY_REQUEST: "GET_WALLET_HISTORY_REQUEST",
  GET_WALLET_HISTORY_SUCCESS: "GET_WALLET_HISTORY_SUCCESS",
  GET_WALLET_HISTORY_FAILURE: "GET_WALLET_HISTORY_FAILURE",
  GET_WALLET_HISTORY_INDICATOR: "GET_WALLET_HISTORY_INDICATOR",
  INCREMENT_WALLET_HISTORY_PAGENUM: "INCREMENT_WALLET_HISTORY_PAGENUM",
  GET_WALLET_REQUESTS: "GET_WALLET_REQUESTS",
  GET_WALLET_REQUESTS_SUCCESS: "GET_WALLET_REQUESTS_SUCCESS",
  GET_WALLET_REQUESTS_FAILURE: "GET_WALLET_REQUESTS_FAILURE",
  GET_WALLET_REQUESTS_INDICATOR: "GET_WALLET_REQUESTS_INDICATOR",
  INCREMENT_WALLET_REQUESTS_PAGENUM: "INCREMENT_WALLET_REQUESTS_PAGENUM",
  REQUEST_WITHDRAWAL_REQUEST: "REQUEST_WITHDRAWAL_REQUEST",
  REQUEST_WITHDRAWAL_SUCCESS: "REQUEST_WITHDRAWAL_SUCCESS",
  REQUEST_WITHDRAWAL_FAILURE: "REQUEST_WITHDRAWAL_FAILURE",
  REQUEST_WITHDRAWAL_INDICATOR: "REQUEST_WITHDRAWAL_INDICATOR",
  SET_PIN_REQUEST: "SET_PIN_REQUEST",
  SET_PIN_SUCCESS: "SET_PIN_SUCCESS",
  SET_PIN_FAILURE: "SET_PIN_FAILURE",
  SET_PIN_INDICATOR: "SET_PIN_INDICATOR",
  UPDATE_BANK_INFO_REQUEST: "UPDATE_BANK_INFO_REQUEST",
  UPDATE_BANK_INFO_SUCCESS: "UPDATE_BANK_INFO_SUCCESS",
  UPDATE_BANK_INFO_FAILURE: "UPDATE_BANK_INFO_FAILURE",
  UPDATE_BANK_INFO_INDICATOR: "UPDATE_BANK_INFO_INDICATOR",
  FUND_WALLET_REQUEST: "FUND_WALLET_REQUEST",
  FUND_WALLET_SUCCESS: "FUND_WALLET_SUCCESS",
  FUND_WALLET_FAILURE: "FUND_WALLET_FAILURE",
  FUND_WALLET_INDICATOR: "FUND_WALLET_INDICATOR",
};

export const auth = {
  SIGN_IN_REQUEST: "SIGN_IN_REQUEST",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  SIGN_IN_ERROR: "SIGN_IN_ERROR",
  SIGN_UP_REQUEST: "SIGN_UP_REQUEST",
  SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
  SIGN_UP_ERROR: "SIGN_UP_ERROR",
  SIGN_OUT: "SIGN_OUT",
  CONFIRM_PIN: "CONFIRM_PIN",
  CONFIRM_PIN_SUCCESS: "CONFIRM_PIN_SUCCESS",
  PIN_ERROR: "PIN_ERROR",
  ISLOADING: "ISLOADING",
  GET_USER_PROFILE: "GET_USER_PROFILE",
  CHECK_PIN_REQUEST: "CHECK_PIN_REQUEST",
  CHECK_PIN_SUCCESS: "CHECK_PIN_SUCCESS",
  CHECK_PIN_FAILURE: "CHECK_PIN_FAILURE",
  RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAILURE: "RESET_PASSWORD_FAILURE",
  FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST",
  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_FAILURE: "FORGOT_PASSWORD_FAILURE",
  FORGOT_PASSWORD_INDICATOR: "FORGOT_PASSWORD_INDICATOR",
};

export const dashboard = {
  GET_USER_DASHBOARD_REQUEST: "GET_USER_DASHBOARD_REQUEST",
  GET_USER_DASHBOARD_SUCCESS: "GET_USER_DASHBOARD_SUCCESS",
  GET_USER_DASHBOARD_FAILURE: "GET_USER_DASHBOARD_FAILURE",
};

export const commodity = {
  GET_COMMODITIES_REQUEST: "GET_COMMODITIES_REQUEST",
  GET_COMMODITIES_SUCCESS: "GET_COMMODITIES_SUCCESS",
  GET_COMMODITIES_FAILURE: "GET_COMMODITIES_FAILURE",
  GET_RELATED_COMMODITIES: "GET_RELATED_COMMODITIES",
  GET_RELATED_COMMODITIES_SUCCESS: "GET_RELATED_COMMODITIES_SUCCESS",
  GET_RELATED_COMMODITIES_FAILURE: "GET_RELATED_COMMODITIES_FAILURE",
  GET_RELATED_COMMODITIES_INDICATOR: "GET_RELATED_COMMODITIES_INDICATOR",
  PURCHASE_COMMODITY_REQUEST: "PURCHASE_COMMODITY_REQUEST",
  PURCHASE_COMMODITY_SUCCESS: "PURCHASE_COMMODITY_SUCCESS",
  PURCHASE_COMMODITY_FAILURE: "PURCHASE_COMMODITY_FAILURE",
  PURCHASE_COMMODITY_INDICATOR: "PURCHASE_COMMODITY_INDICATOR",
  INCREMENT_PAGENUM: "INCREMENT_PAGENUM",
  GET_SINGLE_COMMODITY_REQUEST: "GET_SINGLE_COMMODITY_REQUEST",
  GET_SINGLE_COMMODITY_SUCCESS: "GET_SINGLE_COMMODITY_SUCCESS",
  GET_SINGLE_COMMODITY_FAILURE: "GET_SINGLE_COMMODITY_FAILURE",
  GET_SINGLE_COMMODITY_INDICATOR: "GET_SINGLE_COMMODITY_INDICATOR",
  GET_LATEST_COMMODITIES_REQUEST: "GET_LATEST_COMMODITIES_REQUEST",
  GET_LATEST_COMMODITIES_SUCCESS: "GET_LATEST_COMMODITIES_SUCCESS",
  GET_LATEST_COMMODITIES_FAILURE: "GET_LATEST_COMMODITIES_FAILURE",
  GET_LATEST_COMMODITIES_INDICATOR: "GET_LATEST_COMMODITIES_INDICATOR",
  CALCULATE_PRICE_REQUEST: "CALCULATE_PRICE_REQUEST",
  CALCULATE_PRICE_SUCCESS: "CALCULATE_PRICE_SUCCESS",
  CALCULATE_PRICE_FAILURE: "CALCULATE_PRICE_FAILURE",
  CALCULATE_PRICE_INDICATOR: "CALCULATE_PRICE_INDICATOR",
  PAY_FROM_WALLET_REQUEST: "PAY_FROM_WALLET_REQUEST",
  PAY_FROM_WALLET_SUCCESS: "PAY_FROM_WALLET_SUCCESS",
  PAY_FROM_WALLET_FAILURE: "PAY_FROM_WALLET_FAILURE",
  PAY_FROM_WALLET_INDICATOR: "PAY_FROM_WALLET_INDICATOR",
};

export const deal = {
  GET_DEALS_REQUEST: "GET_DEALS_REQUEST",
  GET_DEALS_SUCCESS: "GET_DEALS_SUCCESS",
  GET_DEALS_FAILURE: "GET_DEALS_FAILURE",
  GET_DEALS_INDICATOR: "GET_DEALS_INDICATOR",
  GET_SINGLE_DEAL_REQUEST: "GET_SINGLE_DEAL_REQUEST",
  GET_SINGLE_DEAL_SUCCESS: "GET_SINGLE_DEAL_SUCCESS",
  GET_SINGLE_DEAL_FAILURE: "GET_SINGLE_DEAL_FAILURE",
  GET_SINGLE_DEAL_INDICATOR: "GET_SINGLE_DEAL_INDICATOR",
};

export const others = {
  GET_TEAM_MEMBERS_REQUEST: "GET_TEAM_MEMBERS_REQUEST",
  GET_TEAM_MEMBERS_SUCCESS: "GET_TEAM_MEMBERS_SUCCESS",
  GET_TEAM_MEMBERS_FAILURE: "GET_TEAM_MEMBERS_FAILURE",
  GET_TEAM_MEMBERS_INDICATOR: "GET_TEAM_MEMBERS_INDICATOR",
  GET_FAQ_REQUEST: "GET_FAQ_REQUEST",
  GET_FAQ_SUCCESS: "GET_FAQ_SUCCESS",
  GET_FAQ_FAILURE: "GET_FAQ_FAILURE",
  GET_FAQ_INDICATOR: "GET_FAQ_INDICATOR",
  GET_REVIEWS_REQUEST: "GET_REVIEWS_REQUEST",
  GET_REVIEWS_SUCCESS: "GET_REVIEWS_SUCCESS",
  GET_REVIEWS_FAILURE: "GET_REVIEWS_FAILURE",
  GET_REVIEWS_INDICATOR: "GET_REVIEWS_INDICATOR",
  GET_PRIVACY_REQUEST: "GET_PRIVACY_REQUEST",
  GET_PRIVACY_SUCCESS: "GET_PRIVACY_SUCCESS",
  GET_PRIVACY_FAILURE: "GET_PRIVACY_FAILURE",
  GET_TERMS_REQUEST: "GET_TERMS_REQUEST",
  GET_TERMS_SUCCESS: "GET_TERMS_SUCCESS",
  GET_TERMS_FAILURE: "GET_TERMS_FAILURE",
  CONTACT_US_REQUEST: "CONTACT_US_REQUEST",
  CONTACT_US_SUCCESS: "CONTACT_US_SUCCESS",
  CONTACT_US_FAILURE: "CONTACT_US_FAILURE",
  CONTACT_US_INDICATOR: "CONTACT_US_INDICATOR",
  NEWSLETTER_REQUEST: "NEWSLETTER_REQUEST",
  NEWSLETTER_SUCCESS: "NEWSLETTER_SUCCESS",
  NEWSLETTER_FAILURE: "NEWSLETTER_FAILURE",
  NEWSLETTER_INDICATOR: "NEWSLETTER_INDICATOR",
};