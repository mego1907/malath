import { Modal, notification } from "antd";
import axiosApp from "../../../../api/index.js";
import {
  CREATE_DISCOUNTCOUPON_FINALLY,
  CREATE_DISCOUNTCOUPON_REQUEST,
  CREATE_DISCOUNTCOUPON_SUCCESS,
  GET_DISCOUNTCOUPON_FINALLY,
  GET_DISCOUNTCOUPON_REQUEST,
  GET_DISCOUNTCOUPON_SUCCESS,
  GET_DISCOUNTCOUPONS_REQUEST,
  GET_DISCOUNTCOUPONS_SUCCESS,
  GET_DISCOUNTCOUPONS_FINALLY,
  UPDATE_DISCOUNTCOUPON_REQUEST,
  UPDATE_DISCOUNTCOUPON_SUCCESS,
  UPDATE_DISCOUNTCOUPON_FINALLY,
  DELETE_DISCOUNTCOUPON_REQUEST,
  DELETE_DISCOUNTCOUPON_SUCCESS,
  DELETE_DISCOUNTCOUPON_FINALLY,
} from "./types.js";

export const discountCoupon = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DISCOUNTCOUPON_REQUEST,
    });
    const response = await axiosApp.get(`/admin/coupons/${id}`);
    dispatch({
      type: GET_DISCOUNTCOUPON_SUCCESS,
      payload: response.data.data,
    });
  }  catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_DISCOUNTCOUPON_FINALLY,
    });
  }
};

export const createCoupon = (values) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_DISCOUNTCOUPON_REQUEST,
    });
    const response = await axiosApp.post(`/admin/coupons`, values, { headers: { "Content-Type": "application/json" }});
    dispatch({
      type: CREATE_DISCOUNTCOUPON_SUCCESS,
      payload: response.data.data,
    });
    notification.success({
      message: 'تمت اضافة الكوبون بنجاح',
      duration: 2,
    })
  }  catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: CREATE_DISCOUNTCOUPON_FINALLY,
    });
  }
};

export const getCoupons = ({ params }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DISCOUNTCOUPONS_REQUEST,
    });
    const response = await axiosApp.get(`/admin/coupons` , { params });
    dispatch({
      type: GET_DISCOUNTCOUPONS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_DISCOUNTCOUPONS_FINALLY,
    });
  }
};

export const updateCoupon = ({ id, values, callback }) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_DISCOUNTCOUPON_REQUEST,
    });
    const response = await axiosApp.patch(
      `/admin/coupons/${id}`,
      values,
      { headers: { "Content-Type": "application/json" } },
    );
    dispatch({
      type: UPDATE_DISCOUNTCOUPON_SUCCESS,
      payload: response.data.data,
    });
    callback()
    notification.success({
      message: "تم تعديل الكوبون بنجاح",
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
      type: UPDATE_DISCOUNTCOUPON_FINALLY,
    });
  }
};

export const deleteCoupon = ({ id, callback }) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_DISCOUNTCOUPON_REQUEST,
    });
    const response = await axiosApp.delete(
      `/admin/coupons/${id}`,
      { headers: { "Content-Type": "application/json" }, },
    );
    dispatch({
      type: DELETE_DISCOUNTCOUPON_SUCCESS,
      payload: response.data.data,
    });
    callback();
    notification.success({
      message: "تم حذف الكوبون بنجاح",
      duration: 2,
      placement:"topLeft"
    });
  }  catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({ type: DELETE_DISCOUNTCOUPON_FINALLY });
  }
};


export const deleteCouponAll = ({ selectedRows, callback }) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_DISCOUNTCOUPON_REQUEST,
    });
    const response = await axiosApp.delete(
      `/admin/coupons/${selectedRows.toString()}`,
      { headers: { "Content-Type": "application/json" } },
    );
    dispatch({
      type: DELETE_DISCOUNTCOUPON_SUCCESS,
      payload: response.data.data,
    });
    callback();
    notification.success({
      message: "تم حذف الكوبون بنجاح",
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
      type: DELETE_DISCOUNTCOUPON_FINALLY,
    });
  }
};

