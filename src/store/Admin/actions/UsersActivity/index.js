

import { Modal } from "antd";
import axiosApp from "../../../../api/index.js";
import { GET_USERACTIVITY_FINALLY, GET_USERACTIVITY_REQUEST, GET_USERACTIVITY_SUCCESS, GET_USERSACTIVITY_FINALLY, GET_USERSACTIVITY_REQUEST, GET_USERSACTIVITY_SUCCESS } from "./types.js";

export const getUsersActivity = ({params}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USERSACTIVITY_REQUEST,
    });
    const response = await axiosApp.get(`/admin/users/activityChart` , {params} );
    dispatch({
      type: GET_USERSACTIVITY_SUCCESS,
      payload: response.data,
    });
  }  catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_USERSACTIVITY_FINALLY,
    });
  }
};

export const getUserActivity = ({id,params}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USERACTIVITY_REQUEST,
    });
    const response = await axiosApp.get(`/admin/users/${id}/activityChart` , {params} );
    dispatch({
      type: GET_USERACTIVITY_SUCCESS,
      payload: response.data,
    });
  }  catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_USERACTIVITY_FINALLY,
    });
  }
};
