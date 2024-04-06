import { DELETE_SOCIALMEDIA_REQUEST,  GET_ONE_SOCIALMEDIA_FINALLY, GET_ONE_SOCIALMEDIA_REQUEST, GET_ONE_SOCIALMEDIA_SUCCESS, GET_SOCIALMEDIA_FINALLY, GET_SOCIALMEDIA_REQUEST, GET_SOCIALMEDIA_SUCCESS, POST_SOCIALMEDIA_FINALLY, POST_SOCIALMEDIA_REQUEST, POST_SOCIALMEDIA_SUCCESS } from "../../actions/socialMedia/types";

export const socialMedia = function (state = {}, action) {
  switch (action.type) {
    case GET_SOCIALMEDIA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SOCIALMEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        dataSocialMedia: action.payload,
      };
    case GET_SOCIALMEDIA_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export const socialMediaDelete = function (state = {}, action) {
  switch (action.type) {
    case DELETE_SOCIALMEDIA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SOCIALMEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_SOCIALMEDIA_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export const oneSocialMedia = function (state = {}, action) {
  switch (action.type) {
    case GET_ONE_SOCIALMEDIA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ONE_SOCIALMEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        dataSocialMediaSingle: action.payload,
      };
    case GET_ONE_SOCIALMEDIA_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const SocialMediaStore = function (state = {}, action) {
  switch (action.type) {
    case POST_SOCIALMEDIA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_SOCIALMEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case POST_SOCIALMEDIA_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};