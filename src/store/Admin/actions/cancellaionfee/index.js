

import { Modal, notification } from "antd";
import axiosApp from "../../../../api/index.js";
import { GET_CANCELLAIONFEEDELETE_FINALLY, GET_CANCELLAIONFEEDELETE_REQUEST, GET_CANCELLAIONFEEDELETE_SUCCESS, GET_CANCELLAIONFEEPOST_FINALLY, GET_CANCELLAIONFEEPOST_REQUEST, GET_CANCELLAIONFEEPOST_SUCCESS, GET_CANCELLAIONFEE_FINALLY, GET_CANCELLAIONFEE_REQUEST, GET_CANCELLAIONFEE_SUCCESS } from "./types.js";

export const cancellaionfee = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CANCELLAIONFEE_REQUEST,
    });
    const response = await axiosApp.get(`/admin/wallet/sessionPriceSettings/cancellaionfee`);
    dispatch({
      type: GET_CANCELLAIONFEE_SUCCESS,
      payload: response.data,
    });
  }  catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_CANCELLAIONFEE_FINALLY,
    });
  }
};

export const cancellaionfeePost = ({values , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CANCELLAIONFEEPOST_REQUEST,
    });
    const response = await axiosApp.post(`/admin/wallet/sessionPriceSettings/cancellaionfee` , values , {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: GET_CANCELLAIONFEEPOST_SUCCESS,
      payload: response.data,
    });
    callback()
    notification.success({
      message: 'تم الحفظ بنجاح',
      duration: 2,
    })
  }  catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_CANCELLAIONFEEPOST_FINALLY,
    });
  }
};


export const cancellaionfeeDelete = ({id , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CANCELLAIONFEEDELETE_REQUEST,
    });
    const response = await axiosApp.delete(`/admin/wallet/sessionPriceSettings/cancellaionfee` , {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id:id,
      }
    });
    dispatch({
      type: GET_CANCELLAIONFEEDELETE_SUCCESS,
      payload: response.data,
    });
    callback()
    notification.success({
      message: 'تم الحفظ بنجاح',
      duration: 2,
    })
  }  catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_CANCELLAIONFEEDELETE_FINALLY,
    });
  }
};
