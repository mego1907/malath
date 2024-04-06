

import { Modal } from "antd";
import axiosApp from "../../../../api/index.js";
import { GET_ACTIVITY_CHART_FINALLY, GET_ACTIVITY_CHART_REQUEST, GET_ACTIVITY_CHART_SUCCESS, GET_AGE_CHART_FINALLY, GET_AGE_CHART_REQUEST, GET_AGE_CHART_SUCCESS, GET_PROFIT_CHART_FINALLY, GET_PROFIT_CHART_REQUEST, GET_PROFIT_CHART_SUCCESS, GET_SESSION_CHART_FINALLY, GET_SESSION_CHART_REQUEST, GET_SESSION_CHART_SUCCESS, GET_USER_CHART_FINALLY, GET_USER_CHART_REQUEST, GET_USER_CHART_SUCCESS } from "./types.js";

export const getUserChart = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_CHART_REQUEST,
    });
    const response = await axiosApp.get(`admin/dashboard/userChart`);
    dispatch({
      type: GET_USER_CHART_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    Modal.error({
      title: 'حدث خطأ ما',
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_USER_CHART_FINALLY,
    });
  }
};
export const getAgeChart = (params) => async (dispatch) => {
  try {
    dispatch({
      type: GET_AGE_CHART_REQUEST,
    });
    const response = await axiosApp.get(`admin/dashboard/ageChart` , params);
    dispatch({
      type: GET_AGE_CHART_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    Modal.error({
      title: 'حدث خطأ ما',
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_AGE_CHART_FINALLY,
    });
  }
};
export const getSessionChart = (params) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SESSION_CHART_REQUEST,
    });
    const response = await axiosApp.get(`admin/dashboard/sessionChart` , params);
    dispatch({
      type: GET_SESSION_CHART_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    Modal.error({
      title: 'حدث خطأ ما',
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_SESSION_CHART_FINALLY,
    });
  }
};
export const getActivityChart = (params) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ACTIVITY_CHART_REQUEST,
    });
    const response = await axiosApp.get(`admin/dashboard/activityChart` , params);
    dispatch({
      type: GET_ACTIVITY_CHART_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    Modal.error({
      title: 'حدث خطأ ما',
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_ACTIVITY_CHART_FINALLY,
    });
  }
};
export const getProfitChart = (params) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROFIT_CHART_REQUEST,
    });
    const response = await axiosApp.get(`admin/dashboard/profitChart` , params);
    dispatch({
      type: GET_PROFIT_CHART_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    Modal.error({
      title: 'حدث خطأ ما',
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_PROFIT_CHART_FINALLY,
    });
  }
};