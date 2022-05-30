import { others } from '../../types';
const {
  GET_TEAM_MEMBERS_FAILURE, GET_TEAM_MEMBERS_REQUEST,
  GET_TEAM_MEMBERS_SUCCESS, GET_TERMS_FAILURE,
  GET_TERMS_REQUEST, GET_TERMS_SUCCESS,
  GET_FAQ_FAILURE, GET_FAQ_REQUEST,
  GET_FAQ_SUCCESS, GET_REVIEWS_FAILURE,
  GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS,
  GET_PRIVACY_FAILURE, GET_PRIVACY_REQUEST,
  GET_PRIVACY_SUCCESS, CONTACT_US_FAILURE,
  CONTACT_US_REQUEST, CONTACT_US_SUCCESS,
  NEWSLETTER_FAILURE, NEWSLETTER_REQUEST,
  NEWSLETTER_SUCCESS
} = others;

export const getTeamMembersRequest = () => {
  return {
    type: GET_TEAM_MEMBERS_REQUEST
  }
}

export const getTeamMembersSuccess = (members) => {
  return {
    type: GET_TEAM_MEMBERS_SUCCESS,
    payload: { members }
  }
}

export const getTeamMembersFailure = (error) => {
  return {
    type: GET_TEAM_MEMBERS_FAILURE,
    payload: { error }
  }
}

export const getFaqRequest = () => {
  return {
    type: GET_FAQ_REQUEST
  }
}

export const getFaqSuccess = (faqs) => {
  return {
    type: GET_FAQ_SUCCESS,
    payload: { faqs }
  }
}

export const getFaqFailure = (error) => {
  return {
    type: GET_FAQ_FAILURE,
    payload: { error }
  }
}

export const getReviewsRequest = () => {
  return {
    type: GET_REVIEWS_REQUEST
  }
}

export const getReviewsSuccess = (reviews) => {
  return {
    type: GET_REVIEWS_SUCCESS,
    payload: { reviews }
  }
}


export const getReviewsFailure = (error) => {
  return {
    type: GET_REVIEWS_FAILURE,
    payload: { error }
  }
}

export const getPrivacyRequest = () => {
  return {
    type: GET_PRIVACY_REQUEST
  }
}

export const getPrivacySuccess = (privacy) => {
  return {
    type: GET_PRIVACY_SUCCESS,
    payload: { privacy }
  }
}

export const getPrivacyFailure = (error) => {
  return {
    type: GET_PRIVACY_FAILURE,
    payload: { error }
  }
}

export const contactUsRequest = (data) => {
  return {
    type: CONTACT_US_REQUEST,
    payload: { data }
  }
}

export const contactUsSuccess = (message) => {
  return {
    type: CONTACT_US_SUCCESS,
    payload: { message }
  }
}

export const contactUsFailure = (error) => {
  return {
    type: CONTACT_US_FAILURE,
    payload: { error }
  }
}

export const newsletterRequest = (data) => {
  return {
    type: NEWSLETTER_REQUEST,
    payload: { data }
  }
}

export const newsletterSuccess = (message) => {
  return {
    type: NEWSLETTER_SUCCESS,
    payload: { message }
  }
}

export const newsletterFailure = (error) => {
  return {
    type: NEWSLETTER_FAILURE,
    payload: { error }
  }
}

export const getTermsRequest = () => {
  return {
    type: GET_TERMS_REQUEST
  }
}

export const getTermsSuccess = (terms) => {
  return {
    type: GET_TERMS_SUCCESS,
    payload: { terms }
  }
}

export const getTermsFailure = (error) => {
  return {
    type: GET_TERMS_FAILURE,
    payload: { error }
  }
}