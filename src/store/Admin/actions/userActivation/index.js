

import { Modal, notification } from "antd";
import axiosApp from "../../../../api/index.js";
import { ACTIVIATE_ONE_USER_ERROR, ACTIVIATE_ONE_USER_REQUEST, ACTIVIATE_ONE_USER_SUCCESS, ACTIVIATE_USER_ERROR, ACTIVIATE_USER_REQUEST, ACTIVIATE_USER_SUCCESS, DELETE_USER_ERROR, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_USERS_ACTIVATION_FINALLY, GET_USERS_ACTIVATION_REQUEST, GET_USERS_ACTIVATION_SUCCESS } from "./types.js";

export const getUsersActivations = ({params}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USERS_ACTIVATION_REQUEST,
    });
    const response = await axiosApp.get(`/admin/users/activations` , {params } );
    dispatch({
      type: GET_USERS_ACTIVATION_SUCCESS,
      payload: response.data,
    });
    // notification.success({
    //   message: response?.data?.message,
    //   duration: 2,
    // });
  } catch (error) {
    Modal.error({
      // title: t("Something went wrong"),
      // content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_USERS_ACTIVATION_FINALLY,
    });
  }
};





export const deleteActivationUser = ({id,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
    });
    const response = await axiosApp.post(`/admin/users/activations/reject`, {id:id.toString()} ,
    {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    notification.success({
      message: "تم حذف المستخدم",
      duration: 2,
    });
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: response.data.data,
    });
    callback()
  } catch (error) {
    dispatch({
      type: DELETE_USER_ERROR,
      payload: error.response.data.message,
    });
  }
};


export const deleteUserActivationAll = ({selectedRows,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
    });
    const response = await axiosApp.post(`/admin/users/activations/reject`, {id:selectedRows.toString() } ,
     {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: response.data.data,
    });
    notification.success({
      message: "تم حذف المستخدم",
      duration: 2,
    });
    callback()
  } catch (error) {
    dispatch({
      type: DELETE_USER_ERROR,
      payload: error.response.data.message,
    });
  }
};


export const activateActivationUser = ({id,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: ACTIVIATE_USER_REQUEST,
    });
    const response = await axiosApp.post(`/admin/users/activations/activate`,  {id:id.toString()} ,
     {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: ACTIVIATE_USER_SUCCESS,
      payload: response.data.data,
    });
    notification.success({
      message: "تم تفعيل المستخدم",
      duration: 2,
    });
    callback()
  } catch (error) {
    dispatch({
      type: ACTIVIATE_USER_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const activateUserActivationAll = ({selectedRows,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: ACTIVIATE_USER_REQUEST,
    });
    const response = await axiosApp.post(`/admin/users/activations/activate`,  {id:selectedRows.toString()} ,
     {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: ACTIVIATE_USER_SUCCESS,
      payload: response.data.data,
    });
    notification.success({
      message: "تم تفعيل المستخدم",
      duration: 2,
    });
    callback()
  } catch (error) {
    dispatch({
      type: ACTIVIATE_USER_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getOneActivation = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ACTIVIATE_ONE_USER_REQUEST,
    });
    const response = await axiosApp.get(`/admin/users/activations/${id}`);
    dispatch({
      type: ACTIVIATE_ONE_USER_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: ACTIVIATE_ONE_USER_ERROR,
      payload: error.response.data.message,
    });
  }
};
