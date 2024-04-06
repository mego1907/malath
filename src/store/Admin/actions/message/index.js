

import { Modal } from "antd";
import { GET_MESSAGE_LIST_REQUEST , GET_MESSAGE_LIST_SUCCESS , GET_MESSAGE_LIST_FINALLY, GET_CONVERSATION_MESSAGE_REQUEST, GET_CONVERSATION_MESSAGE_SUCCESS, GET_CONVERSATION_MESSAGE_FINALLY } from "./types.js";

export const getMessageList = (response) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MESSAGE_LIST_REQUEST,
    });
    dispatch({
      type: GET_MESSAGE_LIST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
    });
  } finally {
    dispatch({
      type: GET_MESSAGE_LIST_FINALLY,
    });
  }
};


export const getConversationMessages = (response) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CONVERSATION_MESSAGE_REQUEST,
    });
    dispatch({
      type: GET_CONVERSATION_MESSAGE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
    });
  } finally {
    dispatch({
      type: GET_CONVERSATION_MESSAGE_FINALLY,
    });
  }
};
