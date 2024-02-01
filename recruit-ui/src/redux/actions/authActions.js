// actions/authActions.js
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = (username, password) => ({
  type: LOGIN_REQUEST,
  payload: { username, password },
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: { ...data },
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: { error },
});
