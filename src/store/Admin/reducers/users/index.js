import { CREATE_USERS_FINALLY, CREATE_USERS_REQUEST, CREATE_USERS_SUCCESS, DELETE_USER_FINALLY, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_ONE_USER_FINALLY, GET_ONE_USER_REQUEST, GET_ONE_USER_SUCCESS, GET_USERS_FINALLY, GET_USERS_REQUEST, GET_USERS_SUCCESS, UPDATE_USER_FINALLY, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "../../actions/users/types";

export const users = function (state = {}, action) {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        dataUsers: action.payload,
      };
    case GET_USERS_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};


export const user = function (state = {}, action) {
  switch (action.type) {
    case GET_ONE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ONE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        dataUser: action.payload,
      };
    case GET_ONE_USER_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
//
export const userDelete = function (state = {}, action) {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_USER_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
//
export const userCreate = function (state = {}, action) {
  switch (action.type) {
    case CREATE_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_USERS_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export const userUpdate = function (state = {}, action) {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_USER_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
//
