import {
  LOGIN,
  LOGOUT,
  SAVEDCREDENTIALS,
  USERID
} from '../actions/types';

const INITIAL_STATE = {
  currentUser: null,
  authenticationToken: '',
  userId: "",
  credentials: {}
};


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        userId: "",
        authenticationToken: ""
      };
    case LOGIN:
      return {
        ...state,
        authenticationToken: action.response,
      }
    case USERID:
      return {
        ...state,
        userId: action.response
      }
    case SAVEDCREDENTIALS:
      return {
        ...state,
        credentials: action.response
      }
    default:
      return state;
  }
}
