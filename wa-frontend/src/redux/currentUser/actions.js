import { UserService } from '../../services';

import {
  READ_USER,
  READ_USER_FAILURE,
  READ_USER_SUCCESS,
  ACTIVATE_USER,
  ACTIVATE_USER_FAILURE,
  ACTIVATE_USER_SUCCESS,
  REJECT_USER,
  REJECT_USER_FAILURE,
  REJECT_USER_SUCCESS,
} from '../actionTypes';

export const readUser = (uid) => {
  return (dispatch) => {
    dispatch({ type: READ_USER });

    return UserService.read({ uid })
      .then(data => dispatch(readUserSuccess(data)))
      .catch(error => dispatch(readUserFailure(error)));
  };
};

export const readUserFailure = (error) => {
  return {
    type: READ_USER_FAILURE,
    payload: { error },
  };
};

export const readUserSuccess = (data) => {
  return {
    type: READ_USER_SUCCESS,
    payload: data,
  };
};

export const activateUser = (uid) => {
  return dispatch => {
    dispatch({ type: ACTIVATE_USER });

    return UserService.activate({ uid })
      .then((data) => dispatch(activateUserSuccess(data)))
      .catch(error => dispatch(activateUserFailure(error)));
  };
};

export const activateUserFailure = error => {
  return {
    type: ACTIVATE_USER_FAILURE,
    payload: { error },
  };
};

export const activateUserSuccess = () => {
  return { type: ACTIVATE_USER_SUCCESS };
};

export const rejectUser = (uid, feedback) => {
  return dispatch => {
    dispatch({ type: REJECT_USER });

    return UserService.reject({ uid, feedback })
      .then(() => dispatch(rejectUserSuccess()))
      .catch(error => dispatch(rejectUserFailure(error)));
  };
};

export const rejectUserFailure = error => {
  return {
    type: REJECT_USER_FAILURE,
    payload: { error },
  };
};

export const rejectUserSuccess = () => {
  return { type: REJECT_USER_SUCCESS };
};