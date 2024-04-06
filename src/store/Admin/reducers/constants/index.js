import { CHANGE_FIELDS_ORDER_FINALLY, CHANGE_FIELDS_ORDER_REQUEST, CHANGE_FIELDS_ORDER_SUCCESS, CREATE_FIELDS_FINALLY, CREATE_FIELDS_REQUEST, CREATE_FIELDS_SUCCESS, GET_COUNTRIES_ERROR, GET_COUNTRIES_REQUEST, GET_COUNTRIES_SUCCESS, GET_FIELDS_ERROR, GET_FIELDS_REQUEST, GET_FIELDS_SUCCESS, GET_LANGUAGES_FINALLY, GET_LANGUAGES_REQUEST, GET_LANGUAGES_SUCCESS, GET_NATIONALITY_FINALLY, GET_NATIONALITY_REQUEST, GET_NATIONALITY_SUCCESS, GET_SUB_FIELDS_ERROR, GET_SUB_FIELDS_REQUEST, GET_SUB_FIELDS_SUCCESS } from "../../actions/constants/types";

export const countries = function (state = {}, action) {
  switch (action.type) {
    case GET_COUNTRIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        dataCountries: action.payload,
      };
    case GET_COUNTRIES_ERROR:
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
export const nationality = function (state = {}, action) {
  switch (action.type) {
    case GET_NATIONALITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_NATIONALITY_SUCCESS:
      return {
        ...state,
        loading: false,
        dataNationality: action.payload,
      };
    case GET_NATIONALITY_FINALLY:
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

export const languages = function (state = {}, action) {
  switch (action.type) {
    case GET_LANGUAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_LANGUAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        dataLanguages: action.payload,
      };
    case GET_LANGUAGES_FINALLY:
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

export const fields = function (state = {}, action) {
  switch (action.type) {
    case GET_FIELDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FIELDS_SUCCESS:
      return {
        ...state,
        loading: false,
        dataFields: action.payload,
      };
    case GET_FIELDS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const subFields = function (state = {}, action) {
  switch (action.type) {
    case GET_SUB_FIELDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SUB_FIELDS_SUCCESS:
      return {
        ...state,
        loading: false,
        dataSubFields: action.payload,
      };
    case GET_SUB_FIELDS_ERROR:
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

export const createFields = function (state = {}, action) {
  switch (action.type) {
    case CREATE_FIELDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_FIELDS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_FIELDS_FINALLY:
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

export const fieldsOrderUpdate = function (state = {}, action) {
  switch (action.type) {
    case CHANGE_FIELDS_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_FIELDS_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CHANGE_FIELDS_ORDER_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
