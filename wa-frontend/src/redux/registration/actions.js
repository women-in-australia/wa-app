import { UserService } from '../../services';

import { REGISTER, REGISTER_FAILURE, REGISTER_SUCCESS } from '../actionTypes';

export const register = form => {
  return dispatch => {
    dispatch({ type: REGISTER });
    console.log(form);
    return UserService.register(form)
      .then(data => dispatch(registerSuccess(data.data)))
      .catch(error => dispatch(registerFailure(error)));
  };
};

export const registerFailure = error => {
  return {
    type: REGISTER_FAILURE,
    payload: { error }
  };
};

export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS
  };
};
