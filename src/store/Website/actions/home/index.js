import axiosApp from "../../../../api/index.js";
import { BLOG_ERROR, BLOG_REQUEST, BLOG_SINGLE_ERROR, BLOG_SINGLE_REQUEST, BLOG_SINGLE_SUCCESS, BLOG_SUCCESS, SECTIONS_ERROR, SECTIONS_REQUEST, SECTIONS_SUCCESS } from "./types.js";

export const getSections = ({params}) => async (dispatch) => {
  try {
    dispatch({
      type: SECTIONS_REQUEST,
    });
    
    const response = await axiosApp.get(`admin/landingpage` ,  {
      params
    });

    dispatch({
      type: SECTIONS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: SECTIONS_ERROR,
      payload: error.response.data.message,
    });
  }
};
export const getBlog = ({params}) => async (dispatch) => {
  try {
    dispatch({
      type: BLOG_REQUEST,
    });
    const response = await axiosApp.get(`admin/landingpage/blogs` ,  {
      params
    });
    dispatch({
      type: BLOG_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getBlogSingle = (id) => async (dispatch) => {
  try {
    dispatch({
      type: BLOG_SINGLE_REQUEST,
    });
    const response = await axiosApp.get(`admin/landingpage/blogs/${id}`);
    dispatch({
      type: BLOG_SINGLE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_SINGLE_ERROR,
      payload: error.response.data.message,
    });
  }
};