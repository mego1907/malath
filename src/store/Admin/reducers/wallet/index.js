import { GET_TRANSACTIONS_FINALLY, GET_TRANSACTIONS_REQUEST, GET_TRANSACTIONS_SUCCESS, GET_WALLETUSERSAll_FINALLY, GET_WALLETUSERSAll_REQUEST, GET_WALLETUSERSAll_SUCCESS, GET_WALLETUSERS_FINALLY, GET_WALLETUSERS_REQUEST, GET_WALLETUSERS_SUCCESS, GET_WALLET_FINALLY, GET_WALLET_REQUEST, GET_WALLET_SUCCESS, GET_WITHDRAW_FINALLY, GET_WITHDRAW_REQUEST, GET_WITHDRAW_SUCCESS } from "../../actions/wallet/types";

export const transactions = function (state = {}, action) {
  switch (action.type) {
    case GET_TRANSACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        dataTransactions: action.payload,
      };
    case GET_TRANSACTIONS_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};


export const wallet = function (state = {}, action) {
  switch (action.type) {
    case GET_WALLET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        dataWallet: action.payload,
      };
    case GET_WALLET_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const walletWithdraw = function (state = {}, action) {
  switch (action.type) {
    case GET_WITHDRAW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_WITHDRAW_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_WITHDRAW_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};


export const walletUsers = function (state = {}, action) {
  switch (action.type) {
    case GET_WALLETUSERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_WALLETUSERS_SUCCESS:
      return {
        ...state,
        loading: false,
        dataWalletUsers:action.payload
      };
    case GET_WALLETUSERS_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};


export const walletUsersAll = function (state = {}, action) {
  switch (action.type) {
    case GET_WALLETUSERSAll_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_WALLETUSERSAll_SUCCESS:
      return {
        ...state,
        loading: false,
        dataWalletUsersAll:action.payload
      };
    case GET_WALLETUSERSAll_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};