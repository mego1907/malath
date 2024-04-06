

import { Modal } from "antd";
import axiosApp from "../../../../api/index.js";
import { GET_PAGE_FINALLY, GET_PAGE_REQUEST, GET_PAGE_SUCCESS, UPDATE_PAGE_FINALLY, UPDATE_PAGE_REQUEST, UPDATE_PAGE_SUCCESS } from "./types.js";

export const getPage = (type) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PAGE_REQUEST,
    });
    const response = await axiosApp.get(`/admin/constants/convention` , {
      params: {
        type: type,
      },
    } );
    dispatch({
      type: GET_PAGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_PAGE_FINALLY,
    });
  }
};


export const updatePage = ({values , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PAGE_REQUEST,
    });
    await axiosApp.put(`/admin/constants/convention` , values , {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    } );
    dispatch({
      type: UPDATE_PAGE_SUCCESS,
    });
    callback()
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: UPDATE_PAGE_FINALLY,
    });
  }
};

