import { GET_SESSIONPRICEPOST_FINALLY, GET_SESSIONPRICEPOST_REQUEST, GET_SESSIONPRICEPOST_SUCCESS, GET_SESSIONPRICE_FINALLY, GET_SESSIONPRICE_REQUEST, GET_SESSIONPRICE_SUCCESS } from "../../actions/sessionPrice/types";

export const sessionPrice = function (state = {}, action) {
  switch (action.type) {
    case GET_SESSIONPRICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SESSIONPRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        dataSessionPrice: action.payload,
      };
    case GET_SESSIONPRICE_FINALLY:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const sessionPricePost = function (state = {}, action) {
  switch (action.type) {
    case GET_SESSIONPRICEPOST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SESSIONPRICEPOST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_SESSIONPRICEPOST_FINALLY:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};