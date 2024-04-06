

import { Modal, notification } from "antd";
import axiosApp from "../../../../api/index.js";
import { GET_SESSIONPRICEPOST_FINALLY, GET_SESSIONPRICEPOST_REQUEST, GET_SESSIONPRICEPOST_SUCCESS, GET_SESSIONPRICE_FINALLY, GET_SESSIONPRICE_REQUEST, GET_SESSIONPRICE_SUCCESS } from "./types.js";

export const sessionPrice = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_SESSIONPRICE_REQUEST,
    });
    const response = await axiosApp.get(`/admin/wallet/sessionPriceSettings`);
    dispatch({
      type: GET_SESSIONPRICE_SUCCESS,
      payload: response.data,
    });
  }  catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_SESSIONPRICE_FINALLY,
    });
  }
};

export const sessionPricePost = (values) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SESSIONPRICEPOST_REQUEST,
    });
    const response = await axiosApp.put(`/admin/wallet/sessionPriceSettings` , values , {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: GET_SESSIONPRICEPOST_SUCCESS,
      payload: response.data,
    });
    notification.success({
      message: 'تم التعديل بنجاح',
      duration: 2,
    })
  }  catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_SESSIONPRICEPOST_FINALLY,
    });
  }
};
