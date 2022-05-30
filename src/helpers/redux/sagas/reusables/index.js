import { put } from 'redux-saga/effects';
import { UIActions, authActions } from '../../actions';
const { showNetworkError } = UIActions;
const { signOut } = authActions;
export const delay = time => new Promise(resolve => setTimeout(resolve, time));

export function* networkError(action) {
  yield put(showNetworkError(action))
}

export function* unAuthenticatedError(err) {
  if(err.title && err.status && err.status === 403) {
    yield put(signOut())
  }
}