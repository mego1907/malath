import { CREATE_BLOGS_ERROR, CREATE_BLOGS_REQUEST, CREATE_BLOGS_SUCCESS, DELETE_BLOGS_ERROR, DELETE_BLOGS_REQUEST, DELETE_BLOGS_SUCCESS, EDIT_BLOGS_ERROR, EDIT_BLOGS_REQUEST, EDIT_BLOGS_SUCCESS, GET_BLOGS_ERROR, GET_BLOGS_REQUEST, GET_BLOGS_SUCCESS, SINGLE_BLOGS_ERROR, SINGLE_BLOGS_REQUEST, SINGLE_BLOGS_SUCCESS } from "../../actions/blog/types";

export const blogs = function (state = {}, action) {
  switch (action.type) {
    case GET_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        dataBlogs: action.payload,
      };
    case GET_BLOGS_ERROR:
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

export const blogStore = function (state = {}, action) {
  switch (action.type) {
    case CREATE_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_BLOGS_ERROR:
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

export const blogSingle = function (state = {}, action) {
  switch (action.type) {
    case SINGLE_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SINGLE_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        dataBlogSingle: action.payload,
      };
    case SINGLE_BLOGS_ERROR:
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


export const blogEdit = function (state = {}, action) {
  switch (action.type) {
    case EDIT_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case EDIT_BLOGS_ERROR:
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
export const blogDelete = function (state = {}, action) {
  switch (action.type) {
    case DELETE_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_BLOGS_ERROR:
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
