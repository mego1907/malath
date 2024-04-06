

import axiosApp from "../../../../api/index.js";
import { CREATE_BLOGS_ERROR, CREATE_BLOGS_REQUEST, CREATE_BLOGS_SUCCESS, DELETE_BLOGS_ERROR, DELETE_BLOGS_REQUEST, DELETE_BLOGS_SUCCESS, EDIT_BLOGS_ERROR, EDIT_BLOGS_REQUEST, EDIT_BLOGS_SUCCESS, GET_BLOGS_ERROR, GET_BLOGS_REQUEST, GET_BLOGS_SUCCESS, SINGLE_BLOGS_ERROR, SINGLE_BLOGS_REQUEST, SINGLE_BLOGS_SUCCESS } from "./types.js";

export const getBlogs = ({page , limit}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BLOGS_REQUEST,
    });
    const response = await axiosApp.get(`/admin/blogs` , {
      params: {
        type: 'ESSAY',
        page: page,
        limit:limit
      },
    } );
    dispatch({
      type: GET_BLOGS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_BLOGS_ERROR,
      payload: error.response.data.message,
    });
  }
};


export const createBlog = ({values ,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_BLOGS_REQUEST,
    });
    const response = await axiosApp.post(`/admin/blogs/` , values);
    dispatch({
      type: CREATE_BLOGS_SUCCESS,
      payload: response.data.data,
    });
    callback()
  } catch (error) {
    dispatch({
      type: CREATE_BLOGS_ERROR,
      payload: error.response.data.message,
    });
  }
};


export const editBlog = ({values ,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_BLOGS_REQUEST,
    });
    const response = await axiosApp.put(`/admin/blogs/` , values);
    dispatch({
      type: EDIT_BLOGS_SUCCESS,
      payload: response.data.data,
    });
    callback()
  } catch (error) {
    dispatch({
      type: EDIT_BLOGS_ERROR,
      payload: error.response.data.message,
    });
  }
};


export const getBlogSingle = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SINGLE_BLOGS_REQUEST,
    });
    const response = await axiosApp.get(`/admin/blogs/${id}`);
    dispatch({
      type: SINGLE_BLOGS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_BLOGS_ERROR,
      payload: error.response.data.message,
    });
  }
};



export const deleteBlogs = ({blogId,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_BLOGS_REQUEST,
    });
    const response = await axiosApp.delete(`/admin/blogs/`,
     {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id:blogId,
      }
    });
    dispatch({
      type: DELETE_BLOGS_SUCCESS,
    });
    callback()
  } catch (error) {
    dispatch({
      type: DELETE_BLOGS_ERROR,
      payload: error.response.data.message,
    });
  }
};


