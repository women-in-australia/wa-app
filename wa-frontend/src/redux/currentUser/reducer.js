import { message } from 'antd';

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

const initialState = {
  isPending: false,
  userData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case READ_USER:
    return {
      ...state,
      isPending: true,
    };

  case READ_USER_FAILURE:
    return {
      ...state,
      isPending: false,
    };
  
  case READ_USER_SUCCESS: {
    const { data } = action.payload;

    return {
      ...state,
      isPending: false,
      userData: data,
    };
  }

  case ACTIVATE_USER:
    return {
      ...state,
      isPending: true,
    };

  case ACTIVATE_USER_FAILURE:
    return {
      ...state,
      isPending: false,
    };

  case ACTIVATE_USER_SUCCESS:
    message.success('Activate Successfully');
    return {
      ...state,
      isPending: false,
    };

  case REJECT_USER:
    return {
      ...state,
      isPending: true,
    };

  case REJECT_USER_FAILURE:
    return {
      ...state,
      isPending: false,
    };
  
  case REJECT_USER_SUCCESS:
    message.warn('Reject Successfully');
    return {
      ...state,
      isPending: false,
    };

  
  default:
    return state;
  }
};

export default reducer;