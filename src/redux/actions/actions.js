//auth actions...
import {
  LOGOUT,
  LOGIN,
  USERID,
  SAVEDCREDENTIALS
} from './types';

export const logoutUser = () => ({
  type: LOGOUT
})
export const loginInResponse = (response) => ({
  type: LOGIN,
  response,
})
export const userIdResponse = (response) => ({
  type: USERID,
  response
})
export const saveCredentials=(response)=>({
  type:SAVEDCREDENTIALS,
  response
})