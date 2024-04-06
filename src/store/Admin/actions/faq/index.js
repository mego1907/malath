

import axiosApp from "../../../../api/index.js";
import { CREATE_FAQ_ERROR, CREATE_FAQ_REQUEST, CREATE_FAQ_SUCCESS, DELETE_FAQ_ERROR, DELETE_FAQ_REQUEST, DELETE_FAQ_SUCCESS, EDIT_FAQ_ERROR, EDIT_FAQ_REQUEST, EDIT_FAQ_SUCCESS, GET_FAQ_ERROR, GET_FAQ_REQUEST, GET_FAQ_SUCCESS, SINGLE_FAQ_ERROR, SINGLE_FAQ_REQUEST, SINGLE_FAQ_SUCCESS } from "./types.js";

export const getFaq = ({page , limit}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_FAQ_REQUEST,
    });
    const response = await axiosApp.get(`/admin/blogs` , {
      params: {
        type: 'QUESTION',
        page: page,
        limit:limit
      },
    } );
    dispatch({
      type: GET_FAQ_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_FAQ_ERROR,
      payload: error.response.data.message,
    });
  }
};


export const createFaq = ({values ,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_FAQ_REQUEST,
    });
    const response = await axiosApp.post(`/admin/blogs/` , values);
    dispatch({
      type: CREATE_FAQ_SUCCESS,
      payload: response.data.data,
    });
    callback()
  } catch (error) {
    dispatch({
      type: CREATE_FAQ_ERROR,
      payload: error.response.data.message,
    });
  }
};


export const editFaq = ({values ,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_FAQ_REQUEST,
    });
    const response = await axiosApp.put(`/admin/blogs/` , values);
    dispatch({
      type: EDIT_FAQ_SUCCESS,
      payload: response.data.data,
    });
    callback()
  } catch (error) {
    dispatch({
      type: EDIT_FAQ_ERROR,
      payload: error.response.data.message,
    });
  }
};


export const getFaqSingle = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SINGLE_FAQ_REQUEST,
    });
    const response = await axiosApp.get(`/admin/blogs/${id}`);
    dispatch({
      type: SINGLE_FAQ_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_FAQ_ERROR,
      payload: error.response.data.message,
    });
  }
};



export const deleteFaq = ({faqId,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_FAQ_REQUEST,
    });
    const response = await axiosApp.delete(`/admin/blogs/`,
     {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id:faqId,
      }
    });
    dispatch({
      type: DELETE_FAQ_SUCCESS,
      payload: response.data.data,
    });
    callback()
  } catch (error) {
    dispatch({
      type: DELETE_FAQ_ERROR,
      payload: error.response.data.message,
    });
  }
};


