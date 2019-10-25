import { retrieveUserData } from '../../utils';
import {
  LOG_IN,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  GET_USER_DATA,
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_SUCCESS,
  LOG_OUT,
} from '../actionTypes';

const { token, userData } = retrieveUserData();

const initialState = {
  isPending: false,
  token: token || null,
  userData: userData || null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case LOG_IN:
    return { ...state, isPending: true };

  case LOG_IN_SUCCESS:
    return {
      ...state,
      isPending: false,
      token: action.payload.token,
      userData: action.payload.user,
    };

  case LOG_IN_FAILURE:
    return { ...state, isPending: false };

  case GET_USER_DATA:
    return { ...state, isPending: true };

  case GET_USER_DATA_SUCCESS:
    return {
      ...state,
      isPending: false,
      userData: action.payload,
    };

  case GET_USER_DATA_FAILURE:
    return { ...state, isPending: false };

  case LOG_OUT:
    return { ...state, token: null, userData: null };

  default:
    return state;
  }
};

export default reducer;
