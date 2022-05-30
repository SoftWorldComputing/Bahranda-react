import { call, put, takeLatest, spawn } from 'redux-saga/effects';
import { others } from '../../types';
import { otherActions, UIActions } from '../../actions';
import { getData, sendData, apiKey } from '../ajax';
import { delay } from '../reusables';

const {
  GET_PRIVACY_REQUEST, CONTACT_US_REQUEST,
  GET_FAQ_REQUEST, GET_REVIEWS_REQUEST,
  GET_TEAM_MEMBERS_REQUEST, GET_TERMS_REQUEST,
  NEWSLETTER_REQUEST, GET_TEAM_MEMBERS_INDICATOR,
  CONTACT_US_INDICATOR, GET_REVIEWS_INDICATOR,
  GET_FAQ_INDICATOR, NEWSLETTER_INDICATOR
} = others;

const {
  startLoading, stopLoading
} = UIActions
const {
  contactUsSuccess, getFaqSuccess,
  getPrivacySuccess, getReviewsSuccess,
  getTeamMembersSuccess, getTermsSuccess,
  newsletterSuccess, contactUsFailure,
  getFaqFailure, getPrivacyFailure,
  getReviewsFailure, getTeamMembersFailure,
  newsletterFailure, getTermsFailure
} = otherActions

const networkErrorMessage = 'No internet connection detected';
const otherDBCalls = {
  getPrivacy: async () => {
    const privacy = await getData(`${apiKey}/front/privacy`);
    return privacy
  },
  getReviews: async () => {
    const reviews = await getData(`${apiKey}/front/reviews`);
    return reviews
  },
  getTeamMembers: async () => {
    const data = await getData(`${apiKey}/front/team-members`);
    return data
  },
  getFaq: async () => {
    const data = await getData(`${apiKey}/front/faqs`);
    return data
  },
  getTerms: async () => {
    const data = await getData(`${apiKey}/front/terms`);
    return data
  },
  contactUs: async ({ data }) => {
    const response = await sendData(`${apiKey}/front/contact-us`, data);
    return response
  },
  newsletter: async ({ data }) => {
    const response = await sendData(`${apiKey}/front/newsletter`, data);
    return response
  },
}

// All generators*
function* getPrivacy() {
  try {
    yield put(startLoading())
    const { privacy } = yield call(otherDBCalls.getPrivacy);
    yield put(getPrivacySuccess(privacy));
  } catch (err) {
    const { status, title } = err;
    const errorMessage = status
      ? title
      : networkErrorMessage
    yield put(getPrivacyFailure(errorMessage))
  } finally {
    yield put(stopLoading())
  }
}

function* getReviews() {
  try {
    yield put({ type: GET_REVIEWS_INDICATOR })
    const reviews = yield call(otherDBCalls.getReviews);
    yield put(getReviewsSuccess(reviews));
  } catch (err) {
    const { status, title } = err;
    const errorMessage = status
      ? title
      : networkErrorMessage
    yield put(getReviewsFailure(errorMessage))
  }
}

function* getTeamMembers() {
  try {
    yield put({ type: GET_TEAM_MEMBERS_INDICATOR })
    const { team_members } = yield call(otherDBCalls.getTeamMembers);
    yield put(getTeamMembersSuccess(team_members));
  } catch (err) {
    const { status, title } = err;
    const errorMessage = status
      ? title
      : networkErrorMessage
    yield put(getTeamMembersFailure(errorMessage))
  }
}

function* getFaq() {
  try {
    yield put({ type: GET_FAQ_INDICATOR })
    const { faqs } = yield call(otherDBCalls.getFaq);
    yield put(getFaqSuccess(faqs));
  } catch (err) {
    const { status, title } = err;
    const errorMessage = status
      ? title
      : networkErrorMessage
    yield put(getFaqFailure(errorMessage))
  }
}


function* getTerms() {
  try {
    yield put(startLoading())
    const { terms } = yield call(otherDBCalls.getTerms);
    yield put(getTermsSuccess(terms));
  } catch (err) {
    const { status, title } = err;
    const errorMessage = status
      ? title
      : networkErrorMessage
    yield put(getTermsFailure(errorMessage))
  } finally {
    yield put(stopLoading())
  }
}

function* contactUs({ payload }) {
  try {
    yield put({ type: CONTACT_US_INDICATOR })
    const { title } = yield call(otherDBCalls.contactUs, payload);
    yield put(contactUsSuccess(title));
    yield call(delay, 3000)
    yield put(contactUsSuccess(''))
  } catch (err) {
    const { status, title } = err;
    const errorMessage = status
      ? title
      : networkErrorMessage
    yield put(contactUsFailure(errorMessage))
    yield call(delay, 3000);
    yield put(contactUsFailure(''))
  }
}


function* newsletter({ payload }) {
  try {
    yield put({ type: NEWSLETTER_INDICATOR })
    const { title } = yield call(otherDBCalls.newsletter, payload);
    yield put(newsletterSuccess(title));
    yield call(delay, 3000)
    yield put(newsletterSuccess(''))
  } catch (err) {
    const { errors, message } = err;
    const errorMessage = errors
      ? errors.email
      ? errors.email[0]
      : message
      : networkErrorMessage
    yield put(newsletterFailure(errorMessage))
    yield call(delay, 3000);
    yield put(newsletterFailure(''))
  }
}

// watchers
function* getPrivacyWatcher() {
  yield takeLatest(GET_PRIVACY_REQUEST, getPrivacy)
}

function* getReviewsWatcher() {
  yield takeLatest(GET_REVIEWS_REQUEST, getReviews)
}

function* getTeamMembersWatcher() {
  yield takeLatest(GET_TEAM_MEMBERS_REQUEST, getTeamMembers)
}

function* getFaqWatcher() {
  yield takeLatest(GET_FAQ_REQUEST, getFaq)
}

function* getTermsWatcher() {
  yield takeLatest(GET_TERMS_REQUEST, getTerms)
}

function* contactUsWatcher() {
  yield takeLatest(CONTACT_US_REQUEST, contactUs)
}

function* newsletterWatcher() {
  yield takeLatest(NEWSLETTER_REQUEST, newsletter)
}

export default function* otherSagas() {
  yield spawn(getPrivacyWatcher)
  yield spawn(getReviewsWatcher)
  yield spawn(getTeamMembersWatcher)
  yield spawn(getFaqWatcher)
  yield spawn(getTermsWatcher)
  yield spawn(contactUsWatcher)
  yield spawn(newsletterWatcher)
}