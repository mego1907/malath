

import { Modal, notification } from "antd";
import axiosApp from "../../../../api/index.js";
import { DELETE_COMMENTS_FINALLY, DELETE_COMMENTS_REQUEST, DELETE_COMMENTS_SUCCESS,  GET_COMMENTS_FINALLY,  GET_COMMENTS_REQUEST, GET_COMMENTS_SUCCESS,   SHOW_COMMENTS_FINALLY, SHOW_COMMENTS_REQUEST, SHOW_COMMENTS_SUCCESS } from "./types.js";

export const getComment = ({params}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_COMMENTS_REQUEST,
    });
    const response = await axiosApp.get(`admin/rates` ,{params:{...params, limit: 10  }} );
    dispatch({
      type: GET_COMMENTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_COMMENTS_FINALLY,
    });
  }
};




export const deleteComment = ({id , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_COMMENTS_REQUEST,
    });
    const response = await axiosApp.delete(`/admin/rates`,
     {
       headers: { 
         "Content-Type": "application/x-www-form-urlencoded"
        },
        
        data:{
          id:id.toString()
        }
    
    });
    dispatch({
      type: DELETE_COMMENTS_SUCCESS,
      payload: response.data.data,
    });
    callback();
    notification.success({
      message: "تم اخفاء التعليق بنجاح",
      duration: 2,
      placement:"topLeft"
    });
  }catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: DELETE_COMMENTS_FINALLY,
    });
  }
};


export const deleteAllComment = ({selectedRows , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_COMMENTS_REQUEST,
    });
    const response = await axiosApp.delete(`/admin/rates` , 
     {
       headers: { 
         "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          id:selectedRows.toString()
        }
    });
    dispatch({
      type: DELETE_COMMENTS_SUCCESS,
      payload: response.data.data,
    });
    callback();
    notification.success({
      message: "تم اخفاء التعليق بنجاح",
      duration: 2,
      placement:"topLeft"
    });
  }catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: DELETE_COMMENTS_FINALLY,
    });
  }
};




export const hideComment = ({id , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_COMMENTS_REQUEST,
    });
    const response = await axiosApp.post(`/admin/rates/hide`,   {id:id.toString()},
     {
       headers: { 
         "Content-Type": "application/x-www-form-urlencoded"
        },
    });
    dispatch({
      type: SHOW_COMMENTS_SUCCESS,
      payload: response.data.data,
    });
    callback();
    notification.success({
      message: "تم اخفاء التعليق بنجاح",
      duration: 2,
      placement:"topLeft"
    });
  }catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: SHOW_COMMENTS_FINALLY,
    });
  }
};


export const hideAllComment = ({selectedRows , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_COMMENTS_REQUEST,
    });
    const response = await axiosApp.post(`/admin/rates/hide/` , {id:selectedRows.toString()} , 
     {
       headers: { 
         "Content-Type": "application/x-www-form-urlencoded"
        },
    });
    dispatch({
      type: SHOW_COMMENTS_SUCCESS,
      payload: response.data.data,
    });
    callback();
    notification.success({
      message: "تم اخفاء التعليق بنجاح",
      duration: 2,
      placement:"topLeft"
    });
  }catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: SHOW_COMMENTS_FINALLY,
    });
  }
};







export const showComment = ({id , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_COMMENTS_REQUEST,
    });
    const response = await axiosApp.post(`/admin/rates/unhide`,   {id:id.toString()},
     {
       headers: { 
         "Content-Type": "application/x-www-form-urlencoded"
        },
    });
    dispatch({
      type: SHOW_COMMENTS_SUCCESS,
      payload: response.data.data,
    });
    callback();
    notification.success({
      message: "تم اظهار التعليق بنجاح",
      duration: 2,
      placement:"topLeft"
    });
  }catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: SHOW_COMMENTS_FINALLY,
    });
  }
};


export const showAllComment = ({selectedRows , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_COMMENTS_REQUEST,
    });
    const response = await axiosApp.post(`/admin/rates/unhide/` , {id:selectedRows.toString()} , 
     {
       headers: { 
         "Content-Type": "application/x-www-form-urlencoded"
        },
    });
    dispatch({
      type: SHOW_COMMENTS_SUCCESS,
      payload: response.data.data,
    });
    callback();
    notification.success({
      message: "تم اظهار التعليق بنجاح",
      duration: 2,
      placement:"topLeft"
    });
  }catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: SHOW_COMMENTS_FINALLY,
    });
  }
};
