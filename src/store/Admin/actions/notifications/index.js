

import { Modal, notification } from "antd";
import axiosApp from "../../../../api/index.js";
import { DELETE_NOTIFICATION_FINALLY, DELETE_NOTIFICATION_REQUEST, DELETE_NOTIFICATION_SUCCESS,  GET_NOTIFICATIONS_FINALLY,  GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS,  GET_SEND_NOTIFICATION_FINALLY,  GET_SEND_NOTIFICATION_REQUEST,  GET_SEND_NOTIFICATION_SPECIFIC_FINALLY,  GET_SEND_NOTIFICATION_SPECIFIC_REQUEST, GET_SEND_NOTIFICATION_SPECIFIC_SUCCESS, GET_SEND_NOTIFICATION_SUCCESS, GET_USER_NOTIFICATION_FINALLY, GET_USER_NOTIFICATION_REQUEST, GET_USER_NOTIFICATION_SUCCESS } from "./types.js";

export const getNotifications = ({params}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_NOTIFICATIONS_REQUEST,
    });
    const response = await axiosApp.get(`admin/notifications` ,{params} );
    dispatch({
      type: GET_NOTIFICATIONS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error?.response?.data?.message,
    });
  } finally {
    dispatch({
      type: GET_NOTIFICATIONS_FINALLY,
    });
  }
};




export const deleteNotification = ({id , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_NOTIFICATION_REQUEST,
    });
    const response = await axiosApp.delete(`/admin/notifications/`, 
     {
       headers: { 
         "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          id:id.toString()
        }
    });
    dispatch({
      type: DELETE_NOTIFICATION_SUCCESS,
      payload: response.data.data,
    });
    callback();
    notification.success({
      message: "تم الحذف بنجاح",
      duration: 2,
      placement:"topLeft"
    });
  }catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error?.response?.data?.message,
    });
  } finally {
    dispatch({
      type: DELETE_NOTIFICATION_FINALLY,
    });
  }
};


export const deleteNotificationAll = ({selectedRows , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_NOTIFICATION_REQUEST,
    });
    const response = await axiosApp.delete(`/admin/notifications/` , 
     {
       headers: { 
         "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          id:selectedRows.toString()
        }
    });
    dispatch({
      type: DELETE_NOTIFICATION_SUCCESS,
      payload: response.data.data,
    });
    callback();
    notification.success({
      message: "تم الحذف بنجاح",
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
      type: DELETE_NOTIFICATION_FINALLY,
    });
  }
};




export const sendNotifiSpecific = ({values  , callback}) => async (dispatch) => {
  values = {
    ...values,
    id:values.ids.toString()
  }
  try {
    dispatch({
      type: GET_SEND_NOTIFICATION_SPECIFIC_REQUEST,
    });
    const response = await axiosApp.post(`admin/notifications/specific` , values ,{
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
       },
      }  );
    dispatch({
      type: GET_SEND_NOTIFICATION_SPECIFIC_SUCCESS,
      payload: response.data,
    });
    callback();
    notification.success({
      message: "تم الارسال بنجاح",
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
      type: GET_SEND_NOTIFICATION_SPECIFIC_FINALLY,
    });
  }
};

export const sendNotifi = ({values , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SEND_NOTIFICATION_REQUEST,
    });
    const response = await axiosApp.post(`admin/notifications/all` , values , {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
       },
    }) ;
    dispatch({
      type: GET_SEND_NOTIFICATION_SUCCESS,
      payload: response.data,
    });
    callback();
    notification.success({
      message: "تم الارسال بنجاح",
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
      type: GET_SEND_NOTIFICATION_FINALLY,
    });
  }
};

export const getUsersNotifi = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_NOTIFICATION_REQUEST,
    });
    const response = await axiosApp.get(`admin/notifications/users` );
    dispatch({
      type: GET_USER_NOTIFICATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_USER_NOTIFICATION_FINALLY,
    });
  }
};
