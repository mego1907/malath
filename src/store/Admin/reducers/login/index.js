import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from "../../actions/login/types";

export const logedIn = function (state = {dataLogin: null, loading: false, error: ""}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        dataLogin:action.payload
      }; 
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
