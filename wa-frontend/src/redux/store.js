import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import application from './application/reducer';
import session from './session/reducer';
import registration from './registration/reducer';
import entities from './entities/reducer';
import users from './users/reducer';
import currentUser from './currentUser/reducer';
import occupation from './occupation/reducer';

const rootReducer = combineReducers({
  application,
  session,
  registration,
  entities,
  users,
  currentUser,
  occupation
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
