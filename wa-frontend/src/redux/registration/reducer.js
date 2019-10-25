import { REGISTER, REGISTER_FAILURE, REGISTER_SUCCESS } from '../actionTypes';

const initialState = {
  isPending: false,
  isDone: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case REGISTER:
    return {
      ...state,
      isPending: true,
    };

  case REGISTER_SUCCESS:
    return {
      ...state,
      isPending: false,
      isDone: true,
    };

  case REGISTER_FAILURE:
    return {
      ...state,
      isPending: false,
    };

  default:
    return state;
  }
};

export default reducer;