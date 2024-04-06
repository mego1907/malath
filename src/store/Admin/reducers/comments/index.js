import { GET_COMMENTS_FINALLY} from "../../actions/comments/types";
import { GET_COMMENTS_SUCCESS } from "../../actions/comments/types";
import { GET_COMMENTS_REQUEST } from "../../actions/comments/types";

export const comments = function (state = {}, action) {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        dataComment: action.payload,
      };
    case GET_COMMENTS_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

// export const showComments = function (state = {}, action) {
//   switch (action.type) {
//     case SHOW_COMMENTS_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case SHOW_COMMENTS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         dataComment: action.payload,
//       };
//     case SHOW_COMMENTS_FINALLY:
//       return {
//         ...state,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// };
//
// export const notificationDelete = function (state = {}, action) {
//   switch (action.type) {
//     case DELETE_COMMENTS_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case DELETE_COMMENTS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//       };
//     case DELETE_COMMENTS_FINALLY:
//       return {
//         ...state,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// };