import {
  CREATE_DISCOUNTCOUPON_FINALLY,
  CREATE_DISCOUNTCOUPON_REQUEST,
  CREATE_DISCOUNTCOUPON_SUCCESS,
  GET_DISCOUNTCOUPON_FINALLY,
  GET_DISCOUNTCOUPON_REQUEST,
  GET_DISCOUNTCOUPON_SUCCESS,
  GET_DISCOUNTCOUPONS_FINALLY,
  GET_DISCOUNTCOUPONS_REQUEST,
  GET_DISCOUNTCOUPONS_SUCCESS,
  UPDATE_DISCOUNTCOUPON_FINALLY,
  UPDATE_DISCOUNTCOUPON_REQUEST,
  UPDATE_DISCOUNTCOUPON_SUCCESS,
  DELETE_DISCOUNTCOUPON_FINALLY,
  DELETE_DISCOUNTCOUPON_REQUEST,
  DELETE_DISCOUNTCOUPON_SUCCESS,
} from "../../actions/discountCoupon/types";

export const coupon = function (state = {}, action) {
  switch (action.type) {
    case GET_DISCOUNTCOUPON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_DISCOUNTCOUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        dataCoupon: action.payload,
      };
    case GET_DISCOUNTCOUPON_FINALLY:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const couponCreate = function (state = {}, action) {
  switch (action.type) {
    case CREATE_DISCOUNTCOUPON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_DISCOUNTCOUPON_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_DISCOUNTCOUPON_FINALLY:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const coupons = function (state = {}, action) {
  switch (action.type) {
    case GET_DISCOUNTCOUPONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_DISCOUNTCOUPONS_SUCCESS:
      return {
        ...state,
        loading: false,
        dataCoupons: action.payload,
      };
    case GET_DISCOUNTCOUPONS_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const couponDelete = function (state = {}, action) {
  switch (action.type) {
    case DELETE_DISCOUNTCOUPON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DISCOUNTCOUPON_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_DISCOUNTCOUPON_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const couponUpdate = function (state = {}, action) {
  switch (action.type) {
    case UPDATE_DISCOUNTCOUPON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_DISCOUNTCOUPON_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_DISCOUNTCOUPON_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
