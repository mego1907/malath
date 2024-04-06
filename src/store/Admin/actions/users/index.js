

import { Modal, notification } from "antd";
import axiosApp from "../../../../api/index.js";
import { ACTIVATE_USER_FINALLY, ACTIVATE_USER_REQUEST, ACTIVATE_USER_SUCCESS, CREATE_USERS_FINALLY, CREATE_USERS_REQUEST, CREATE_USERS_SUCCESS, DELETE_USER_FINALLY, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_ONE_USER_FINALLY, GET_ONE_USER_REQUEST, GET_ONE_USER_SUCCESS, GET_USERS_FINALLY, GET_USERS_REQUEST, GET_USERS_SUCCESS, NO_ACTIVATE_USER_FINALLY, NO_ACTIVATE_USER_REQUEST, NO_ACTIVATE_USER_SUCCESS, UPDATE_USER_FINALLY, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "./types.js";

export const getUsers = ({params}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USERS_REQUEST,
    });
    const response = await axiosApp.get(`/admin/users` , {params } );
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_USERS_FINALLY,
    });
  }
};


export const getOneUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ONE_USER_REQUEST,
    });
    const response = await axiosApp.get(`/admin/users/${id}`);
    dispatch({
      type: GET_ONE_USER_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_ONE_USER_FINALLY,
    });
  }
};




export const createUser = ({values , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_USERS_REQUEST,
    });
    const response = await axiosApp.post(`/admin/users/` , values);
    if (response.status === 201) {
      dispatch({
        type: CREATE_USERS_SUCCESS,
        payload: response.data.data,
      });
      callback()
      notification.success({
        message: "تم اضافة المستخدم بنجاح",
        duration: 2,
        placement:"topLeft"
      });
    } else {
      Modal.error({
        title: "حدث خطأ ما!",
        content: response?.response?.data?.message,
      });
    }
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message || error.response.data.body.message,
    });
  } finally {
    dispatch({
      type: CREATE_USERS_FINALLY,
    });
  }
};



export const updateUser = ({values , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    const response = await axiosApp.put(`/admin/users/` , values  ,
    {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }});
    
    if (response.status === 200) {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: response.data.data,
      });
      callback();
      notification.success({
        message: "تم تعديل المستخدم بنجاح",
        duration: 2,
        placement:"topLeft"
      });
    } else {
      Modal.error({
        title: "حدث خطأ ما!",
        content: response?.response?.data?.message,
      });
    }
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message || error.response.data.body.message,
    });
  } finally {
    dispatch({
      type: UPDATE_USER_FINALLY,
    });
  }
};



export const deleteUser = ({id,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
    });
    const response = await axiosApp.delete(`/admin/users/`,
     {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id:id,
      }
    });
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: response.data.data,
    });
    callback();
    notification.success({
      message: "تم حذف المستخدم بنجاح",
      duration: 2,
      placement:"topLeft"
    });
  }  catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: DELETE_USER_FINALLY,
    });
  }
};


export const deleteUserAll = ({selectedRows,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
    });
    const response = await axiosApp.delete(`/admin/users/`,
     {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id:selectedRows.toString(),
      }
    });
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: response.data.data,
    });
    callback();
    notification.success({
      message: "تم حذف المستخدم بنجاح",
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
      type: DELETE_USER_FINALLY,
    });
  }
};








export const activateUser = ({selectedRows,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: ACTIVATE_USER_REQUEST,
    });
    const response = await axiosApp.post(`/admin/users/unblock`,  {id:selectedRows.toString()} ,
     {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: ACTIVATE_USER_SUCCESS,
      payload: response.data.data,
    });
    callback();
    notification.success({
      message: "تم تفعيل المستخدم بنجاح",
      duration: 2,
      placement:"topLeft"
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: ACTIVATE_USER_FINALLY,
    });
  }
};







export const noActivateUser = ({selectedRows,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: NO_ACTIVATE_USER_REQUEST,
    });
    const response = await axiosApp.post(`/admin/users/block`, {id:selectedRows.toString()} ,
     {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
      
      // data: {
      // }
    });
    dispatch({
      type: NO_ACTIVATE_USER_SUCCESS,
      payload: response.data.data,
    });
    callback();
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: NO_ACTIVATE_USER_FINALLY,
    });
  }
};






export const videoRemove = (id) => async (dispatch) => {
  try {
    dispatch({
      type: NO_ACTIVATE_USER_REQUEST,
    });
    await axiosApp.delete(`/admin/users/vidoe`, 
     {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        id:id
      }
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  }
};




