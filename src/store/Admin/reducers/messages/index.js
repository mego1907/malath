import { GET_CONVERSATION_MESSAGE_FINALLY, GET_CONVERSATION_MESSAGE_REQUEST, GET_CONVERSATION_MESSAGE_SUCCESS, GET_MESSAGE_LIST_FINALLY, GET_MESSAGE_LIST_REQUEST, GET_MESSAGE_LIST_SUCCESS } from "../../actions/message/types";

export const messages = function (state = {}, action) {
  switch (action.type) {
    case GET_MESSAGE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MESSAGE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        dataMessages: action.payload,
      };
    case GET_MESSAGE_LIST_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const messagesSingle = function (state = {}, action) {
  switch (action.type) {
    case GET_CONVERSATION_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CONVERSATION_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        dataMessagesSingle: action.payload,
      };
    case GET_CONVERSATION_MESSAGE_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
