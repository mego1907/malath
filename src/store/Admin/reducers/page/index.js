import { GET_PAGE_FINALLY, GET_PAGE_REQUEST, GET_PAGE_SUCCESS, UPDATE_PAGE_FINALLY, UPDATE_PAGE_REQUEST, UPDATE_PAGE_SUCCESS } from "../../actions/page/types";

export const page = function (state = {}, action) {
  switch (action.type) {
    case GET_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        dataPage: action.payload,
      };
    case GET_PAGE_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};


export const pageUpdate = function (state = {}, action) {
  switch (action.type) {
    case UPDATE_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PAGE_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};