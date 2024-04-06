

import axiosApp from "../../../../api/index.js";
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from "./types.js";

export const login = ({values , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const response = await axiosApp.post(`admin/auth/signin` , values);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data.data,
    });
    localStorage.setItem("user", JSON.stringify(response.data.data));
    window.location.reload();
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: error.response.data.message,
    });
  }
};



// export const login =
//   ({ values, callback }) =>
//   async (dispatch) => {
//     try {
//       dispatch({
//         type: LOGIN_REQUEST,
//       });
//       const response = await axiosApp.post(`/auth/login`, values);
//       if(response.data.data.account.is_verified_mobile === false){
//         localStorage.setItem("user", JSON.stringify(response.data.data));
//         dispatch({
//           type: LOGIN_VERIFY,
//           payload: response.data.data.account.mobile,
//         });
//       }else{
//       dispatch({
//         type: LOGIN_SUCCESS,
//         // payload: response.data.data.account,
//       });
//       // localStorage.setItem("api_token", response.data.data.api_token);
//       localStorage.setItem("user", JSON.stringify(response.data.data));
//       Cookies.set('api_token', response.data.data.api_token)
//       // window.location.reload()
//       setTimeout(
//         function() {
//           callback();
//         }
//         .bind(this),
//         500,
//         setTimeout(
//           function() {
//             window.location.reload();
//           }
//           .bind(this),
//           1000
//       )
//     );
//       }


    
//     } catch (error) {
//       dispatch({
//         type: LOGIN_ERROR,
//         payload: error.response.data.message,
//       });
//     }
//   };