import {  GET_SESSIONS_FINALLY, GET_SESSIONS_REQUEST, GET_SESSIONS_SUCCESS } from "../../actions/sessions/types";

export const sessions = function (state = {}, action) {
  switch (action.type) {
    case GET_SESSIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SESSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        dataSessions: action.payload,
      };
    case GET_SESSIONS_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
//
// export const userDelete = function (state = {}, action) {
//   switch (action.type) {
//     case DELETE_USER_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case DELETE_USER_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//       };
//     case DELETE_USER_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };
//
