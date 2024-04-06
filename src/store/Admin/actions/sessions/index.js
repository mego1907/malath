

import { Modal, notification } from "antd";
import axiosApp from "../../../../api/index.js";
import { DELETE_SESSIONS_FINALLY, DELETE_SESSIONS_REQUEST, DELETE_SESSIONS_SUCCESS, GET_SESSIONS_FINALLY, GET_SESSIONS_REQUEST, GET_SESSIONS_SUCCESS } from "./types.js";

export const getSessions = ({params}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SESSIONS_REQUEST,
    });
    const response = await axiosApp.get(`/admin/sessions` , {params} );
    dispatch({
      type: GET_SESSIONS_SUCCESS,
      payload: response.data,
    });
  }  catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_SESSIONS_FINALLY,
    });
  }
};

export const deleteSessions = ({id , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SESSIONS_REQUEST,
    });
    const response = await axiosApp.post(`/admin/sessions/deactivate` , {id:id.toString()}  , 
    {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: DELETE_SESSIONS_SUCCESS,
      payload: response.data,
    });
    callback();
    notification.success({
      message: "تم الحذف بنجاح",
      duration: 2,
      placement:"topLeft"
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: DELETE_SESSIONS_FINALLY,
    });
  }
};

export const deleteSessionsAll = ({selectedRows,callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SESSIONS_REQUEST,
    });
    const response = await axiosApp.post(`/admin/sessions/deactivate` , {id:selectedRows.toString()} , 
    {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    } );
    dispatch({
      type: DELETE_SESSIONS_SUCCESS,
      payload: response.data,
    });
    callback();
    notification.success({
      message: "تمت العملية بنجاح",
      duration: 2,
      placement:"topLeft"
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: DELETE_SESSIONS_FINALLY,
    });
  }
};




// export const createUser = ({values , callback}) => async (dispatch) => {
//   try {
//     dispatch({
//       type: CREATE_USERS_REQUEST,
//     });
//     const response = await axiosApp.post(`/admin/users/` , values);
//     dispatch({
//       type: CREATE_USERS_SUCCESS,
//       payload: response.data.data,
//     });
//     callback()
//   } catch (error) {
//     dispatch({
//       type: CREATE_USERS_ERROR,
//       payload: error.response.data.message,
//     });
//   }
// };



// export const deleteUser = ({userId,callback}) => async (dispatch) => {
//   try {
//     dispatch({
//       type: DELETE_USER_REQUEST,
//     });
//     const response = await axiosApp.delete(`/admin/users/`,
//      {
//       headers: { 
//         "Content-Type": "application/x-www-form-urlencoded"
//       },
//       data: {
//         id:userId,
//       }
//     });
//     dispatch({
//       type: DELETE_USER_SUCCESS,
//       payload: response.data.data,
//     });
//     callback()
//   } catch (error) {
//     dispatch({
//       type: DELETE_USER_ERROR,
//       payload: error.response.data.message,
//     });
//   }
// };




