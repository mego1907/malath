

import { Modal, notification } from "antd";
import axiosApp from "../../../../api/index.js";
import { ACTIVATE_WALLET_FINALLY, ACTIVATE_WALLET_REQUEST, ACTIVATE_WALLET_SUCCESS, DEACTIVATE_WALLET_FINALLY, DEACTIVATE_WALLET_REQUEST, DEACTIVATE_WALLET_SUCCESS, GET_TRANSACTIONS_FINALLY, GET_TRANSACTIONS_REQUEST, GET_TRANSACTIONS_SUCCESS, GET_WALLETUSERSAll_FINALLY, GET_WALLETUSERSAll_REQUEST, GET_WALLETUSERSAll_SUCCESS, GET_WALLETUSERS_FINALLY, GET_WALLETUSERS_REQUEST, GET_WALLETUSERS_SUCCESS, GET_WALLET_FINALLY, GET_WALLET_REQUEST, GET_WALLET_SUCCESS, GET_WITHDRAW_FINALLY, GET_WITHDRAW_REQUEST, GET_WITHDRAW_SUCCESS, RETURN_WALLET_FINALLY, RETURN_WALLET_REQUEST, RETURN_WALLET_SUCCESS } from "./types.js";

export const getTransactions = ({params}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TRANSACTIONS_REQUEST,
    });
    const response = await axiosApp.get(`admin/wallet/transactions` ,{params});
    dispatch({
      type: GET_TRANSACTIONS_SUCCESS,
      payload: response.data,
    });
  }catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_TRANSACTIONS_FINALLY,
    });
  }
};




export const getWallet = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_WALLET_REQUEST,
    });
    const response = await axiosApp.get(`admin/wallet/0`);
    dispatch({
      type: GET_WALLET_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_WALLET_FINALLY,
    });
  }
};



export const depoistWithdraw = ({values , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_WITHDRAW_REQUEST,
    });
    const response = await axiosApp.post(`admin/wallet/transactions` , values, {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: GET_WITHDRAW_SUCCESS,
      payload: response.data,
    });
    callback();
    notification.success({
      message: 'تم العملية بنجاح',
      duration: 2,
    })
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_WITHDRAW_FINALLY,
    });
  }
};




export const activateWallet = ({id , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: ACTIVATE_WALLET_REQUEST,
    });
    const response = await axiosApp.post(`admin/wallet/transactions/activate` , {id:id}, {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: ACTIVATE_WALLET_SUCCESS,
      payload: response.data,
    });
    callback();
    notification.success({
      message: 'تم العملية بنجاح',
      duration: 2,
    })
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: ACTIVATE_WALLET_FINALLY,
    });
  }
};

export const deactivateWallet = ({id , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: DEACTIVATE_WALLET_REQUEST,
    });
    const response = await axiosApp.post(`admin/wallet/transactions/deactivate` , {id:id}, {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: DEACTIVATE_WALLET_SUCCESS,
      payload: response.data,
    });
    callback();
    notification.success({
      message: 'تم العملية بنجاح',
      duration: 2,
    })
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: DEACTIVATE_WALLET_FINALLY,
    });
  }
};

export const returnWallet = ({id , callback}) => async (dispatch) => {
  try {
    dispatch({
      type: RETURN_WALLET_REQUEST,
    });
    const response = await axiosApp.post(`/admin/wallet/transactions/return` ,  {id:id}, {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    dispatch({
      type: RETURN_WALLET_SUCCESS,
      payload: response.data,
    });
    callback();
    notification.success({
      message: 'تم العملية بنجاح',
      duration: 2,
    })
  } catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: RETURN_WALLET_FINALLY,
    });
  }
};



export const getWalletUsers = ({params}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_WALLETUSERS_REQUEST,
    });
    const response = await axiosApp.get(`admin/wallet/users` ,{params});
    dispatch({
      type: GET_WALLETUSERS_SUCCESS,
      payload: response.data,
    });
  }catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_WALLETUSERS_FINALLY,
    });
  }
};



export const getWalletUsersAll = ({params}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_WALLETUSERSAll_REQUEST,
    });
    const response = await axiosApp.get(`admin/wallet/transactions/all` ,{params});
    dispatch({
      type: GET_WALLETUSERSAll_SUCCESS,
      payload: response.data,
    });
  }catch (error) {
    Modal.error({
      title: "حدث خطأ ما!",
      content: error.response.data.message,
    });
  } finally {
    dispatch({
      type: GET_WALLETUSERSAll_FINALLY,
    });
  }
};

