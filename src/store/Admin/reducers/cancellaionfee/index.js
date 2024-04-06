import { GET_CANCELLAIONFEEDELETE_FINALLY, GET_CANCELLAIONFEEDELETE_REQUEST, GET_CANCELLAIONFEEDELETE_SUCCESS, GET_CANCELLAIONFEEPOST_FINALLY, GET_CANCELLAIONFEEPOST_REQUEST, GET_CANCELLAIONFEEPOST_SUCCESS, GET_CANCELLAIONFEE_FINALLY, GET_CANCELLAIONFEE_REQUEST, GET_CANCELLAIONFEE_SUCCESS } from "../../actions/cancellaionfee/types";

export const cancellaionfee = function (state = {}, action) {
  switch (action.type) {
    case GET_CANCELLAIONFEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CANCELLAIONFEE_SUCCESS:
      return {
        ...state,
        loading: false,
        dataCancellaionfee: action.payload,
      };
    case GET_CANCELLAIONFEE_FINALLY:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const cancellaionfeePost = function (state = {}, action) {
  switch (action.type) {
    case GET_CANCELLAIONFEEPOST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CANCELLAIONFEEPOST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_CANCELLAIONFEEPOST_FINALLY:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export const cancellaionfeeDelete = function (state = {}, action) {
  switch (action.type) {
    case GET_CANCELLAIONFEEDELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CANCELLAIONFEEDELETE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_CANCELLAIONFEEDELETE_FINALLY:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};