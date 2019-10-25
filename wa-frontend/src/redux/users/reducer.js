import { READ_USERS, READ_USERS_FAILURE, READ_USERS_SUCCESS } from '../actionTypes';

const initialState = {
  unreviewed: {
    isPending: false,
    list: [],
    pagination: {
      page: 1,
      allPageNum: 1,
      hasNext: false,
      hasPrevious: false,
    },
  },
  approved: {
    isPending: false,
    list: [],
    pagination: {
      page: 1,
      allPageNum: 1,
      hasNext: false,
      hasPrevious: false,
    },
  },
  rejected: {
    isPending: false,
    list: [],
    pagination: {
      page: 1,
      allPageNum: 1,
      hasNext: false,
      hasPrevious: false,
    },
  },
  all: {
    isPending: false,
    list: [],
    pagination: {
      page: 1,
      allPageNum: 1,
      hasNext: false,
      hasPrevious: false,
    },
  },  
};

const reducer = (state = initialState, action) => {
  const type = action.payload ? action.payload.type : null;
  switch (action.type) {
  case READ_USERS:
    return {
      ...state,
      [type]: {
        ...state[type],
        isPending: true,
      },
    };

  case READ_USERS_FAILURE:
    return {
      ...state,
      [type]: {
        ...state[type],
        isPending: false,
      },
    };
  
  case READ_USERS_SUCCESS: {
    const { data, page, allPageNum, hasNext, hasPrevious } = action.payload;
    return {
      ...state,
      [type]: {
        isPending: false,
        list: data,
        pagination: { page, allPageNum, hasNext, hasPrevious },
      },
    };
  }
  
  default:
    return state;
  }
};

export default reducer;