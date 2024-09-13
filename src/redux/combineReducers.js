import { combineReducers } from 'redux';
import reducer from './reducers/reducer';

export default combineReducers({
  userSession: reducer,
});
