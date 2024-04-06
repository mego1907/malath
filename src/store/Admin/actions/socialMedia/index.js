

import { Modal, notification } from "antd";
import axiosApp from "../../../../api/index.js";
import { ACTICATE_SOCIALMEDIA_FINALLY, ACTICATE_SOCIALMEDIA_REQUEST, ACTICATE_SOCIALMEDIA_SUCCESS, DEACTIVATE_SOCIALMEDIA_FINALLY, DEACTIVATE_SOCIALMEDIA_REQUEST, DEACTIVATE_SOCIALMEDIA_SUCCESS,  DELETE_SOCIALMEDIA_FINALLY, DELETE_SOCIALMEDIA_REQUEST, DELETE_SOCIALMEDIA_SUCCESS, GET_ONE_SOCIALMEDIA_FINALLY, GET_ONE_SOCIALMEDIA_REQUEST, GET_ONE_SOCIALMEDIA_SUCCESS,  GET_SOCIALMEDIA_FINALLY, GET_SOCIALMEDIA_REQUEST, GET_SOCIALMEDIA_SUCCESS, POST_SOCIALMEDIA_FINALLY, POST_SOCIALMEDIA_REQUEST, POST_SOCIALMEDIA_SUCCESS } from "./types.js";

export const getSocialMedia = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_SOCIALMEDIA_REQUEST,
    });
    const response = await axiosApp.get(`admin/constants/socialmedia`);
    dispatch({
      type: GET_SOCIALMEDIA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_SOCIALMEDIA_FINALLY,
    });
  }
};


export const getOneSocialMedia = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ONE_SOCIALMEDIA_REQUEST,
    });
    const response = await axiosApp.get(`admin/constants/socialmedia/${id}` );
    dispatch({
      type: GET_ONE_SOCIALMEDIA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_ONE_SOCIALMEDIA_FINALLY,
    });
  }
};



export const deleteSocialMedia = ({id , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SOCIALMEDIA_REQUEST,
    });
    const response = await axiosApp.delete(`/admin/constants/socialmedia/`,
     {
       headers: { 
         "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          id:id,
        }
    });
    dispatch({
      type: DELETE_SOCIALMEDIA_SUCCESS,
      payload: response.data.data,
    });
    callback();
    notification.success({
      message: 'تم الحذف بنجاح بنجاح',
      duration: 2,
    })
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: DELETE_SOCIALMEDIA_FINALLY,
    });
  }
};



export const SocialMediaPost = ({values , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: POST_SOCIALMEDIA_REQUEST,
    });
    await axiosApp.post(`/admin/constants/socialmedia/`,values);
    dispatch({
      type: POST_SOCIALMEDIA_SUCCESS,
    });
    callback();
    notification.success({
      message: 'تم الاضافة بنجاح بنجاح',
      duration: 2,
    })
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: POST_SOCIALMEDIA_FINALLY,
    });
  }
};

export const SocialMediaUpdate = ({values , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: POST_SOCIALMEDIA_REQUEST,
    });
    await axiosApp.put(`/admin/constants/socialmedia/`,values, {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
       },
     });
    dispatch({
      type: POST_SOCIALMEDIA_SUCCESS,
    });
    callback();
    notification.success({
      message: 'تم التعديل بنجاح',
      duration: 2,
    })
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: POST_SOCIALMEDIA_FINALLY,
    });
  }
};





export const SocialMediaActicvate = ({id ,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: ACTICATE_SOCIALMEDIA_REQUEST,
    });
    await axiosApp.post(`/admin/constants/socialmedia/activate`, {id:id.toString()} ,
    {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: ACTICATE_SOCIALMEDIA_SUCCESS,
    });
    callback();
    notification.success({
      message: 'تم  التفعيل بنجاح',
      duration: 2,
    })
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: ACTICATE_SOCIALMEDIA_FINALLY,
    });
  }
};


export const SocialMediaDeactivate = ({id , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DEACTIVATE_SOCIALMEDIA_REQUEST,
    });
    await axiosApp.post(`/admin/constants//socialmedia/deactivate`, {id:id.toString()} ,
    {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: DEACTIVATE_SOCIALMEDIA_SUCCESS,
    });
    callback();
    notification.success({
      message: 'تم التعطيل بنجاح',
      duration: 2,
    })
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: DEACTIVATE_SOCIALMEDIA_FINALLY,
    });
  }
};
