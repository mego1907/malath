

import { Modal, notification } from "antd";
import axiosApp from "../../../../api/index.js";
import { ACTIVATE_FIELDS_FINALLY, ACTIVATE_FIELDS_REQUEST, ACTIVATE_FIELDS_SUCCESS, CHANGE_FIELDS_ORDER_FINALLY, CHANGE_FIELDS_ORDER_REQUEST, CHANGE_FIELDS_ORDER_SUCCESS, CREATE_FIELDS_FINALLY, CREATE_FIELDS_REQUEST, CREATE_FIELDS_SUCCESS, DEACTIVATE_FIELDS_FINALLY, DEACTIVATE_FIELDS_REQUEST, DEACTIVATE_FIELDS_SUCCESS,  DELETE_FIELDS_FINALLY, DELETE_FIELDS_REQUEST, DELETE_FIELDS_SUCCESS, GET_COUNTRIES_ERROR, GET_COUNTRIES_REQUEST, GET_COUNTRIES_SUCCESS, GET_FIELDS_ERROR, GET_FIELDS_REQUEST, GET_FIELDS_SUCCESS, GET_LANGUAGES_FINALLY, GET_LANGUAGES_REQUEST, GET_LANGUAGES_SUCCESS, GET_NATIONALITY_FINALLY, GET_NATIONALITY_REQUEST, GET_NATIONALITY_SUCCESS, GET_SUB_FIELDS_ERROR, GET_SUB_FIELDS_REQUEST, GET_SUB_FIELDS_SUCCESS } from "./types.js";

export const getCountries = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_COUNTRIES_REQUEST,
    });
    const response = await axiosApp.get(`/constants/countries` );
    dispatch({
      type: GET_COUNTRIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_COUNTRIES_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getFields = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_FIELDS_REQUEST,
    });
    const response = await axiosApp.get(`/admin/constants/fields/all` );
    dispatch({
      type: GET_FIELDS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_FIELDS_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getSubFields = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SUB_FIELDS_REQUEST,
    });
    const response = await axiosApp.get(`/admin/constants/fields/subfields/${id}` );
    dispatch({
      type: GET_SUB_FIELDS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SUB_FIELDS_ERROR,
      payload: error.response.data.message,
    });
  }
};


export const createFields = ({values,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_FIELDS_REQUEST,
    });
    const response = await axiosApp.post(`/admin/constants/fields` , values , 
    {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    } );
    dispatch({
      type: CREATE_FIELDS_SUCCESS,
      payload: response.data,
    });
    notification.success({
      message: "تم اضافة المجال",
      duration: 2,
    });
    callback?.();
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما",
    });
  } finally {
    dispatch({
      type: CREATE_FIELDS_FINALLY,
    });
  }
};

export const updateFields = ({values,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_FIELDS_REQUEST,
    });
    const response = await axiosApp.put(`/admin/constants/fields` , values, 
    {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    } );
    dispatch({
      type: CREATE_FIELDS_SUCCESS,
      payload: response.data,
    });
    notification.success({
      message: "تم اضافة المجال",
      duration: 2,
    });
    callback?.();
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما",
    });
  } finally {
    dispatch({
      type: CREATE_FIELDS_FINALLY,
    });
  }
};



export const createFieldsSub = ({values ,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_FIELDS_REQUEST,
    });
    const response = await axiosApp.post(`/admin/constants/fields` , values , 
    {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    } );
    dispatch({
      type: CREATE_FIELDS_SUCCESS,
      payload: response.data,
    });
    notification.success({
      message: "تم اضافة المجال الفرعي",
      duration: 2,
    });
    callback?.();
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما",
    });
  } finally {
    dispatch({
      type: CREATE_FIELDS_FINALLY,
    });
  }
};




export const deleteFields = ({id,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_FIELDS_REQUEST,
    });
    const response = await axiosApp.delete(`/admin/constants/fields`, 
    {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        id:id.toString()
      }
    });
    notification.success({
      message: "تم حذف المستخدم",
      duration: 2,
    });
    dispatch({
      type: DELETE_FIELDS_SUCCESS,
      payload: response.data.data,
    });
    callback()
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما",
    });
  } finally {
    dispatch({
      type: DELETE_FIELDS_FINALLY,
    });
  }
};


export const deleteFieldsAll = ({selectedRows,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_FIELDS_REQUEST,
    });
    const response = await axiosApp.delete(`/admin/constants/fields`, 
     {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        id:selectedRows.toString()
      }
    });
    dispatch({
      type: DELETE_FIELDS_SUCCESS,
      payload: response.data.data,
    });
    notification.success({
      message: "تم حذف المستخدم",
      duration: 2,
    });
    callback()
  } catch (error) {
    dispatch({
      type: DELETE_FIELDS_FINALLY,
      payload: error.response.data.message,
    });
  }
};

export const activateFields = ({id,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: ACTIVATE_FIELDS_REQUEST,
    });
    const response = await axiosApp.post(`/admin/constants/fields/activate`,  {id:id.toString()} ,
     {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: ACTIVATE_FIELDS_SUCCESS,
      payload: response.data.data,
    });
    notification.success({
      message: "تم تفعيل المستخدم",
      duration: 2,
    });
    callback()
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما",
    });
  } finally {
    dispatch({
      type: ACTIVATE_FIELDS_FINALLY,
    });
  }
};

export const activateFieldsAll = ({selectedRows,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: ACTIVATE_FIELDS_REQUEST,
    });
    const response = await axiosApp.post(`/admin/constants/fields/activate`,  {id:selectedRows.toString()} ,
     {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: ACTIVATE_FIELDS_SUCCESS,
      payload: response.data.data,
    });
    notification.success({
      message: "تم تفعيل المستخدم",
      duration: 2,
    });
    callback()
  } catch (error) {
    dispatch({
      type: ACTIVATE_FIELDS_FINALLY,
      payload: error.response.data.message,
    });
  }
};

export const deactivateFields = ({id,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DEACTIVATE_FIELDS_REQUEST,
    });
    const response = await axiosApp.post(`/admin/constants/fields/deactivate`,  {id:id.toString()} ,
     {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: DEACTIVATE_FIELDS_SUCCESS,
      payload: response.data.data,
    });
    notification.success({
      message: "تم تفعيل المستخدم",
      duration: 2,
    });
    callback()
  }  catch (error) {
    Modal.error({
      title: "حدث خطأ ما",
    });
  } finally {
    dispatch({
      type: DEACTIVATE_FIELDS_FINALLY,
    });
  }
};

export const deactivateFieldsAll = ({selectedRows,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DEACTIVATE_FIELDS_REQUEST,
    });
    const response = await axiosApp.post(`/admin/constants/fields/deactivate`,  {id:selectedRows.toString()} ,
     {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: DEACTIVATE_FIELDS_SUCCESS,
      payload: response.data.data,
    });
    notification.success({
      message: "تم تفعيل المستخدم",
      duration: 2,
    });
    callback()
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما",
    });
  } finally {
    dispatch({
      type: DEACTIVATE_FIELDS_FINALLY,
    });
  }
};

// 

export const getNationality = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_NATIONALITY_REQUEST,
    });
    const response = await axiosApp.get(`/admin/constants/nationalites` );
    dispatch({
      type: GET_NATIONALITY_SUCCESS,
      payload: response.data,
    });
  }  catch (error) {
    Modal.error({
      title: "حدث خطأ ما",
    });
  } finally {
    dispatch({
      type: GET_NATIONALITY_FINALLY,
    });
  }
};

export const getLanguages = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_LANGUAGES_REQUEST,
    });
    const response = await axiosApp.get(`/admin/constants/languages` );
    dispatch({
      type: GET_LANGUAGES_SUCCESS,
      payload: response.data,
    });
  }  catch (error) {
    Modal.error({
      title: "حدث خطأ ما",
    });
  } finally {
    dispatch({
      type: GET_LANGUAGES_FINALLY,
    });
  }
};

export const changeFieldsOrder = ({ id, values, callback }) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_FIELDS_ORDER_REQUEST,
    });
    const { order_no } = values;

    const response = await axiosApp.patch(
      `/admin/constants/fields/${id}/order`,
      { order_no },
      { headers: { "Content-Type": "application/json" } },
    );
    dispatch({
      type: CHANGE_FIELDS_ORDER_SUCCESS,
      payload: response.data.message,
    });
    callback();
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما",
    });
  } finally {
    dispatch({
      type: CHANGE_FIELDS_ORDER_FINALLY,
    });
  }
};
