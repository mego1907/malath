

import { Modal, notification } from "antd";
import axiosApp from "../../../../api/index.js";
import {
  CREATE_LECTURES_FINALLY,
  CREATE_LECTURES_REQUEST,
  CREATE_LECTURES_SUCCESS,
  DELETE_LECTURE_FINALLY,
  DELETE_LECTURE_REQUEST,
  DELETE_LECTURE_SUCCESS,
  GET_ADVISERS_FOR_LECTURE_FINALLY,
  GET_ADVISERS_FOR_LECTURE_REQUEST,
  GET_ADVISERS_FOR_LECTURE_SUCCESS,
  GET_ONE_LECTURE_FINALLY,
  GET_ONE_LECTURE_REQUEST,
  GET_ONE_LECTURE_SUCCESS,
  GET_LECTURES_FINALLY,
  GET_LECTURES_REQUEST,
  GET_LECTURES_SUCCESS,
  UPDATE_LECTURE_FINALLY,
  UPDATE_LECTURE_REQUEST,
  UPDATE_LECTURE_SUCCESS,
  UPDATE_LECTURE_ORDER_FINALLY,
  UPDATE_LECTURE_ORDER_REQUEST,
  UPDATE_LECTURE_ORDER_SUCCESS,
} from "./types.js";

export const getAdvisersList = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ADVISERS_FOR_LECTURE_REQUEST,
    });
    const response = await axiosApp.get(`/admin/lectures/advisers/create`);
    dispatch({
      type: GET_ADVISERS_FOR_LECTURE_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_ADVISERS_FOR_LECTURE_FINALLY,
    });
  }
};

export const getLectures = ({ params }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LECTURES_REQUEST,
    });
    const response = await axiosApp.get(`/admin/lectures` , { params });
    dispatch({
      type: GET_LECTURES_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_LECTURES_FINALLY,
    });
  }
};

export const getOneLecture = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ONE_LECTURE_REQUEST,
    });
    const response = await axiosApp.get(`/admin/lectures/${id}`);
    dispatch({
      type: GET_ONE_LECTURE_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_ONE_LECTURE_FINALLY,
    });
  }
};

export const createLecture = ({ values , callback }) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_LECTURES_REQUEST,
    });
    const response = await axiosApp.post(
      `/admin/lectures/`,
      values,
      { headers: { "Content-Type": "application/form-data" } },
    );
    dispatch({
      type: CREATE_LECTURES_SUCCESS,
      payload: response.data.data,
    });
    callback()
    notification.success({
      message: "تم اضافة المحاضرة بنجاح",
      duration: 2,
      placement:"topLeft"
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message || error.response.data.body.message,
    });
  } finally {
    dispatch({
      type: CREATE_LECTURES_FINALLY,
    });
  }
};

export const updateLecture = ({ id, values, callback }) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_LECTURE_REQUEST,
    });
    const response = await axiosApp.patch(
      `/admin/lectures/${id}`,
      values,
      { headers: { "Content-Type": "application/form-data" } },
    );
    dispatch({
      type: UPDATE_LECTURE_SUCCESS,
      payload: response.data.data,
    });
    callback()
    notification.success({
      message: "تم تعديل المحاضرة بنجاح",
      duration: 2,
      placement:"topLeft"
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message || error.response.data.body.message,
    });
  } finally {
    dispatch({
      type: UPDATE_LECTURE_FINALLY,
    });
  }
};

export const updateLectureOrder = ({ id, values, callback }) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_LECTURE_ORDER_REQUEST,
    });
    const response = await axiosApp.patch(
      `/admin/lectures/${id}/order`,
      values,
      { headers: { "Content-Type": "application/json" } },
    );
    dispatch({
      type: UPDATE_LECTURE_ORDER_SUCCESS,
      payload: response.data.data,
    });
    callback()
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message || error.response.data.body.message,
    });
  } finally {
    dispatch({
      type: UPDATE_LECTURE_ORDER_FINALLY,
    });
  }
};

export const deleteLecture = ({ id, callback }) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_LECTURE_REQUEST,
    });
    const response = await axiosApp.delete(
      `/admin/lectures/${id}`,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" }, },
    );
    dispatch({
      type: DELETE_LECTURE_SUCCESS,
      payload: response.data.data,
    });
    callback();
    notification.success({
      message: "تم حذف المحاضرة بنجاح",
      duration: 2,
      placement:"topLeft"
    });
  }  catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({ type: DELETE_LECTURE_FINALLY });
  }
};


export const deleteLectureAll = ({ selectedRows, callback }) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_LECTURE_REQUEST,
    });
    const response = await axiosApp.delete(
      `/admin/lectures/${selectedRows.toString()}`,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );
    dispatch({
      type: DELETE_LECTURE_SUCCESS,
      payload: response.data.data,
    });
    callback();
    notification.success({
      message: "تم حذف المحاضرة بنجاح",
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
      type: DELETE_LECTURE_FINALLY,
    });
  }
};
