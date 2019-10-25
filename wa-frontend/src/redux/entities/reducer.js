import { READ_ENTITIES, READ_ENTITIES_FAILURE, READ_ENTITIES_SUCCESS } from '../actionTypes';

const initialState = {
  isPending: false,
  data: null,
  page: 1,
  allPageNum: 1,
  hasNext: false,
  hasPrevious: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case READ_ENTITIES:
    return {
      ...state,
      isPending: true,
    };

  case READ_ENTITIES_FAILURE:
    return {
      ...state,
      isPending: false,
    };
  
  case READ_ENTITIES_SUCCESS: {
    const { data, page, allPageNum, hasNext, hasPrevious } = action.payload;

    return {
      ...state,
      isPending: false,
      data, page, allPageNum, hasNext, hasPrevious,
    };
  }
  
  default:
    return state;
  }
};

export default reducer;