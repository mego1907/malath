import { BLOG_ERROR, BLOG_REQUEST, BLOG_SINGLE_ERROR, BLOG_SINGLE_REQUEST, BLOG_SINGLE_SUCCESS, BLOG_SUCCESS, SECTIONS_ERROR, SECTIONS_REQUEST, SECTIONS_SUCCESS } from "../../actions/home/types";

export const sections = function (state = {dataSections: null, loading: false, error: "",}, action) {
  switch (action.type) {
    case SECTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SECTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        dataSections:action.payload
      }; 
    case SECTIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export const blogsHome = function (state = {}, action) {
  switch (action.type) {
    case BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        dataBlogs:action.payload
      }; 
    case BLOG_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export const blogsHomeSingle = function (state = {}, action) {
  switch (action.type) {
    case BLOG_SINGLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BLOG_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        dataBlogsSingle:action.payload
      }; 
    case BLOG_SINGLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
