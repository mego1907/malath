import { DELETE_NOTIFICATION_FINALLY, DELETE_NOTIFICATION_REQUEST, DELETE_NOTIFICATION_SUCCESS, GET_NOTIFICATIONS_FINALLY, GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS, GET_SEND_NOTIFICATION_FINALLY, GET_SEND_NOTIFICATION_REQUEST, GET_SEND_NOTIFICATION_SPECIFIC_FINALLY, GET_SEND_NOTIFICATION_SPECIFIC_REQUEST, GET_SEND_NOTIFICATION_SPECIFIC_SUCCESS, GET_SEND_NOTIFICATION_SUCCESS, GET_USER_NOTIFICATION_FINALLY, GET_USER_NOTIFICATION_REQUEST, GET_USER_NOTIFICATION_SUCCESS } from "../../actions/notifications/types";

export const notifications = function (state = {}, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        dataNotifications: action.payload,
      };
    case GET_NOTIFICATIONS_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
//
export const notificationDelete = function (state = {}, action) {
  switch (action.type) {
    case DELETE_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_NOTIFICATION_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const notificationUsers = function (state = {}, action) {
  switch (action.type) {
    case GET_USER_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        dataUsersNotifi: action.payload,
      };
    case GET_USER_NOTIFICATION_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};


export const notificationSendSpecific = function (state = {}, action) {
  switch (action.type) {
    case GET_SEND_NOTIFICATION_SPECIFIC_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SEND_NOTIFICATION_SPECIFIC_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_SEND_NOTIFICATION_SPECIFIC_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};



export const notificationSend = function (state = {}, action) {
  switch (action.type) {
    case GET_SEND_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SEND_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_SEND_NOTIFICATION_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

