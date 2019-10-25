import { message } from 'antd';

import {
  INVITE_FAILURE,
  READ_USERS_FAILURE,
  REGISTER_FAILURE,
  READ_USER_FAILURE,
  READ_ENTITIES_FAILURE,
  LOG_IN_FAILURE,
  REJECT_USER_FAILURE,
  UPDATE_USER_FAILURE,
  DELETE_ENTITY_FAILURE,
  GET_USER_DATA_FAILURE,
  READ_NOTIFICATIONS_FAILURE,
} from '../actionTypes';

const failureList = [
  READ_USERS_FAILURE,
  READ_ENTITIES_FAILURE,
  READ_USER_FAILURE,
  REGISTER_FAILURE,
  LOG_IN_FAILURE,
  INVITE_FAILURE,
  REJECT_USER_FAILURE,
  UPDATE_USER_FAILURE,
  DELETE_ENTITY_FAILURE,
  GET_USER_DATA_FAILURE,
  READ_NOTIFICATIONS_FAILURE,
];

const initialState = {};

const reducer = (state = initialState, action) => {
  const { type } = action;
  if (failureList.includes(type)) {
    const { error } = action.payload;

    if (error.response && error.response.status === 401) {
      message.warn('Token Expired, Please Log in Again');
    } else {
      message.error(error.message);
    }
  }

  return state;
};

export default reducer;