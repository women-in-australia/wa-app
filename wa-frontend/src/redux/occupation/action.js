import { EntityService } from '../../services';
import { GET_OCCUPATION } from '../actionTypes';

export const getOccupation = input => {
  return dispatch => {
    return EntityService.occupationPrompt(input)
      .then(({ data }) =>
        dispatch({
          type: GET_OCCUPATION,
          payload: {
            input,
            data
          }
        })
      )
      .catch(error => {});
  };
};
