import { EntityService } from '../../services';

import { READ_ENTITIES, READ_ENTITIES_FAILURE, READ_ENTITIES_SUCCESS } from '../actionTypes';

export const readEntities = ({ page, pageSize }) => {
  return (dispatch) => {
    dispatch({ type: READ_ENTITIES });
    return EntityService.readAll({ page, pageSize })
      .then(data => dispatch(readEntitiesSuccess(data)))
      .catch(error => dispatch(readEntitiesFailure(error)));
  };
};

export const readEntitiesFailure = (error) => {
  return {
    type: READ_ENTITIES_FAILURE,
    payload: { error },
  };
};

export const readEntitiesSuccess = (data) => {
  return {
    type: READ_ENTITIES_SUCCESS,
    payload: data,
  };
};