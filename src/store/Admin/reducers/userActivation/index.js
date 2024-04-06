import { ACTIVIATE_ONE_USER_ERROR, ACTIVIATE_ONE_USER_REQUEST, ACTIVIATE_ONE_USER_SUCCESS, ACTIVIATE_USER_ERROR, ACTIVIATE_USER_REQUEST, ACTIVIATE_USER_SUCCESS, DELETE_USER_ERROR, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_USERS_ACTIVATION_FINALLY, GET_USERS_ACTIVATION_REQUEST, GET_USERS_ACTIVATION_SUCCESS } from "../../actions/userActivation/types";

export const usersActivations = function (state = {}, action) {
  switch (action.type) {
    case GET_USERS_ACTIVATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_ACTIVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        dataUsersActivations: action.payload,
      };
    case GET_USERS_ACTIVATION_FINALLY:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};



export const userActivationDelete = function (state = {}, action) {
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
    case DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


//


export const userActivationDeleteAll = function (state = {}, action) {
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
    case DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const activateActivationUser = function (state = {}, action) {
  switch (action.type) {
    case ACTIVIATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTIVIATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ACTIVIATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const activateUserActivationAll = function (state = {}, action) {
  switch (action.type) {
    case ACTIVIATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTIVIATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ACTIVIATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getOneUserActivation = function (state = {}, action) {
  switch (action.type) {
    case ACTIVIATE_ONE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTIVIATE_ONE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        dataActivation:action.payload
      };
    case ACTIVIATE_ONE_USER_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
