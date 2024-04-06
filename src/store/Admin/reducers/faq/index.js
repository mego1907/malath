import { CREATE_FAQ_ERROR, CREATE_FAQ_REQUEST, CREATE_FAQ_SUCCESS, DELETE_FAQ_ERROR, DELETE_FAQ_REQUEST, DELETE_FAQ_SUCCESS, EDIT_FAQ_ERROR, EDIT_FAQ_REQUEST, EDIT_FAQ_SUCCESS, GET_FAQ_ERROR, GET_FAQ_REQUEST, GET_FAQ_SUCCESS, SINGLE_FAQ_ERROR, SINGLE_FAQ_REQUEST, SINGLE_FAQ_SUCCESS } from "../../actions/faq/types";

export const faq = function (state = {}, action) {
  switch (action.type) {
    case GET_FAQ_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FAQ_SUCCESS:
      return {
        ...state,
        loading: false,
        dataFaq: action.payload,
      };
    case GET_FAQ_ERROR:
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

export const faqStore = function (state = {}, action) {
  switch (action.type) {
    case CREATE_FAQ_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_FAQ_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_FAQ_ERROR:
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

export const faqSingle = function (state = {}, action) {
  switch (action.type) {
    case SINGLE_FAQ_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SINGLE_FAQ_SUCCESS:
      return {
        ...state,
        loading: false,
        dataFaqSingle: action.payload,
      };
    case SINGLE_FAQ_ERROR:
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


export const faqEdit = function (state = {}, action) {
  switch (action.type) {
    case EDIT_FAQ_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_FAQ_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case EDIT_FAQ_ERROR:
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
export const faqDelete = function (state = {}, action) {
  switch (action.type) {
    case DELETE_FAQ_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_FAQ_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_FAQ_ERROR:
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
