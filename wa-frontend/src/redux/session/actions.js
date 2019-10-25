import { message } from 'antd';

import history from '../../history';
import { UserService } from '../../services';
import { storeUserData, clearUserData } from '../../utils';
import {
  LOG_IN,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  GET_USER_DATA,
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_SUCCESS,
  LOG_OUT,
} from '../actionTypes';

export const logIn = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOG_IN });
    return UserService.logIn({ email, password })
      .then(data => dispatch(logInSuccess(data.data)))
      .catch(error => dispatch(logInFailure(error)));
  };
};

export const logInFailure = (error) => {
  return {
    type: LOG_IN_FAILURE,
    payload: { error },
  };
};

export const logInSuccess = ({ token, user }) => {
  message.success('Log in Successfully');
  storeUserData({ token, userData: user });

  return {
    type: LOG_IN_SUCCESS,
    payload: { token, user },
  };
};

export const getUserData = (next) => {
  return dispatch => {
    dispatch({ type: GET_USER_DATA });
    return UserService.getData()
      .then(data => {
        dispatch(getUserDataSuccess(data.data));
        next();
      })
      .catch(error => dispatch(getUserDataFailure(error)));
  };
};

export const getUserDataFailure = error => {
  return {
    type: GET_USER_DATA_FAILURE,
    payload: { error },
  };
};

export const getUserDataSuccess = data => {
  return {
    type: GET_USER_DATA_SUCCESS,
    payload: data,
  };
};

export const logOut = () => {
  return dispatch => {
    clearUserData();
    dispatch({ type: LOG_OUT });
    history.push('/session/create');
  };
};
