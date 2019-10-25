import { GET_OCCUPATION } from '../actionTypes';

const initialState = {
  data: {}
};

//register monitor
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OCCUPATION: {
      let { data, input } = action.payload;
      let preData = state.data;
      return {
        ...state,
        data: {
          ...preData,
          [input]: data
        }
      };
    }
    default:
      return state;
  }
};

export default reducer;
