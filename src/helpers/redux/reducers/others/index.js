import { others } from '../../types';
const {
  GET_PRIVACY_SUCCESS, CONTACT_US_SUCCESS,
  GET_FAQ_SUCCESS, GET_REVIEWS_SUCCESS,
  GET_TEAM_MEMBERS_SUCCESS, GET_TERMS_SUCCESS,
  NEWSLETTER_SUCCESS, GET_REVIEWS_FAILURE,
  CONTACT_US_FAILURE, GET_FAQ_FAILURE,
  GET_PRIVACY_FAILURE, GET_TEAM_MEMBERS_FAILURE,
  GET_TERMS_FAILURE, NEWSLETTER_FAILURE,
  CONTACT_US_INDICATOR, GET_FAQ_INDICATOR,
  GET_REVIEWS_INDICATOR, GET_TEAM_MEMBERS_INDICATOR,
  NEWSLETTER_INDICATOR
} = others;

const initialState = () => {
  return {
    teamMembers: [],
    faqs: [],
    reviews: [],
    privacy: '',
    terms: '',
    loadingIndicators: {
      teamMembers: false,
      faqs: false,
      reviews: false,
      contactUs: false,
      newsletter: false
    },
    errors: {  },
    success: { 
      hasFetchedTeam: false,
      hasFetchedFaq: false,
      hasFetchedPrivacy: false,
      hasfetchedTerms: false,
      newsletter: ''
     }
  }
}

const otherReducer = (prevState = initialState(), { type, payload }) => {
  switch(type) {
    case GET_TEAM_MEMBERS_INDICATOR:
      prevState.loadingIndicators.teamMembers = true;
      return { ...prevState }
    case GET_TEAM_MEMBERS_SUCCESS:
      prevState.loadingIndicators.teamMembers = false;
      prevState.teamMembers = payload.members;
      prevState.success.hasFetchedTeam = true;
      return { ...prevState }
    case GET_TEAM_MEMBERS_FAILURE:
      prevState.loadingIndicators.teamMembers = false;
      prevState.errors.teamMembers = payload.error
      return { ...prevState }
    case GET_FAQ_INDICATOR:
      prevState.loadingIndicators.faqs = true;
      return { ...prevState }
    case GET_FAQ_SUCCESS:
      prevState.loadingIndicators.faqs = false;
      prevState.success.hasFetchedFaq = true;
      prevState.faqs = payload.faqs;
      return { ...prevState }
    case GET_FAQ_FAILURE:
      prevState.loadingIndicators.faqs = false;
      prevState.errors.faqs = payload.error
      return { ...prevState }
    case GET_REVIEWS_INDICATOR:
      prevState.loadingIndicators.reviews = true;
      return { ...prevState }
    case GET_REVIEWS_SUCCESS:
      prevState.loadingIndicators.reviews = false;
      prevState.reviews = payload.reviews
      return { ...prevState }
    case GET_REVIEWS_FAILURE:
      prevState.loadingIndicators.reviews = false;
      prevState.errors.reviews = payload.error;
      return { ...prevState }
    case GET_PRIVACY_SUCCESS:
      prevState.privacy = payload.privacy;
      prevState.success.hasFetchedPrivacy = true;
      return { ...prevState }
    case GET_PRIVACY_FAILURE:
      prevState.errors.privacy = payload.error;
      return { ...prevState }
    case GET_TERMS_SUCCESS:
      prevState.terms = payload.terms
      prevState.success.hasfetchedTerms = true;
      return { ...prevState }
    case GET_TERMS_FAILURE:
      prevState.errors.terms = payload.error;
      return { ...prevState }
    case CONTACT_US_INDICATOR:
      prevState.loadingIndicators.contactUs = true;
      return { ...prevState }
    case CONTACT_US_SUCCESS:
      prevState.loadingIndicators.contactUs = false;
      prevState.success.contactUs = payload.message
      return { ...prevState }
    case CONTACT_US_FAILURE:
      prevState.loadingIndicators.contactUs = false;
      prevState.errors.contactUs = payload.error;
      return { ...prevState }
    case NEWSLETTER_INDICATOR:
      prevState.loadingIndicators.newsletter = true;
      return { ...prevState }
    case NEWSLETTER_SUCCESS:
      prevState.loadingIndicators.newsletter = false;
      prevState.success.newsletter = payload.message;
      return { ...prevState }
    case NEWSLETTER_FAILURE:
      prevState.loadingIndicators.newsletter = false;
      prevState.errors.newsletter = payload.error
      return { ...prevState }
    default:
      return prevState
  }
}

export default otherReducer;