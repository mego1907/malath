import { GET_USERACTIVITY_FINALLY, GET_USERACTIVITY_REQUEST, GET_USERACTIVITY_SUCCESS, GET_USERSACTIVITY_FINALLY, GET_USERSACTIVITY_REQUEST, GET_USERSACTIVITY_SUCCESS } from "../../actions/UsersActivity/types";

export const usersActivity = function (state = {}, action) {
  switch (action.type) {
    case GET_USERSACTIVITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USERSACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        dataUsersActivity: action.payload,
      };
    case GET_USERSACTIVITY_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const userActivity = function (state = {}, action) {
  switch (action.type) {
    case GET_USERACTIVITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USERACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        dataUserActivity: action.payload,
      };
    case GET_USERACTIVITY_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};