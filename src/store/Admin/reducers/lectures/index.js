import {
  CREATE_LECTURES_FINALLY,
  CREATE_LECTURES_REQUEST,
  CREATE_LECTURES_SUCCESS,
  DELETE_LECTURE_FINALLY,
  DELETE_LECTURE_REQUEST,
  DELETE_LECTURE_SUCCESS,
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
  GET_ADVISERS_FOR_LECTURE_FINALLY,
  GET_ADVISERS_FOR_LECTURE_REQUEST,
  GET_ADVISERS_FOR_LECTURE_SUCCESS,
} from "../../actions/lectures/types";

export const advisers = function (state = {}, action) {
  switch (action.type) {
    case GET_ADVISERS_FOR_LECTURE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ADVISERS_FOR_LECTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        dataAdvisers: action.payload,
      };
    case GET_ADVISERS_FOR_LECTURE_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const lectures = function (state = {}, action) {
  switch (action.type) {
    case GET_LECTURES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_LECTURES_SUCCESS:
      return {
        ...state,
        loading: false,
        dataLectures: action.payload,
      };
    case GET_LECTURES_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const lecture = function (state = {}, action) {
  switch (action.type) {
    case GET_ONE_LECTURE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ONE_LECTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        dataLecture: action.payload,
      };
    case GET_ONE_LECTURE_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const lectureDelete = function (state = {}, action) {
  switch (action.type) {
    case DELETE_LECTURE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_LECTURE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_LECTURE_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const lectureCreate = function (state = {}, action) {
  switch (action.type) {
    case CREATE_LECTURES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_LECTURES_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_LECTURES_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const lectureUpdate = function (state = {}, action) {
  switch (action.type) {
    case UPDATE_LECTURE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_LECTURE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_LECTURE_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const lectureOrderUpdate = function (state = {}, action) {
  switch (action.type) {
    case UPDATE_LECTURE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_LECTURE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_LECTURE_ORDER_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
