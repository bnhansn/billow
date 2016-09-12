import { push } from 'react-router-redux';
import {
  LOGOUT_SUCCESS,
  LOCATION_CHANGE,
  AUTHENTICATION_START,
  AUTHENTICATION_ERROR,
  AUTHENTICATION_SUCCESS,
} from './constants';
import api from '../../api';

export function logout() {
  return dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT_SUCCESS });
    dispatch(push('/'));
  };
}

export function authenticate(token) {
  return dispatch => {
    dispatch({ type: AUTHENTICATION_START });
    api.post('/authenticate', { token })
      .then(response => {
        localStorage.setItem('token', JSON.stringify(response.meta.token));
        dispatch({ type: AUTHENTICATION_SUCCESS, payload: response });
      })
      .catch(() => {
        dispatch({ type: AUTHENTICATION_ERROR });
        dispatch(logout());
      });
  };
}

export function locationChange(location) {
  return { type: LOCATION_CHANGE, location: { ...location } };
}
