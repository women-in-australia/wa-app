import { UserService } from '../../services';

import { READ_USERS, READ_USERS_FAILURE, READ_USERS_SUCCESS } from '../actionTypes';

export const readUsers = ({ type, page, pageSize }) => {
  return (dispatch) => {
    dispatch({
      type: READ_USERS,
      payload: { type }
    });

    return UserService.readAll({ type, page, pageSize })
      .then(data => dispatch(readUsersSuccess(data, type)))
      .catch(error => dispatch(readUsersFailure(error, type)));
  };
};

export const readUsersFailure = (error, type) => {
  return {
    type: READ_USERS_FAILURE,
    payload: { error, type },
  };
};

export const readUsersSuccess = (data, type) => {
  return {
    type: READ_USERS_SUCCESS,
    payload: { ...data, type },
  };
};