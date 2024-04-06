import { GET_ACTIVITY_CHART_FINALLY, GET_ACTIVITY_CHART_REQUEST, GET_ACTIVITY_CHART_SUCCESS, GET_AGE_CHART_FINALLY, GET_AGE_CHART_REQUEST, GET_AGE_CHART_SUCCESS, GET_PROFIT_CHART_FINALLY, GET_PROFIT_CHART_REQUEST, GET_PROFIT_CHART_SUCCESS, GET_SESSION_CHART_FINALLY, GET_SESSION_CHART_REQUEST, GET_SESSION_CHART_SUCCESS, GET_USER_CHART_FINALLY, GET_USER_CHART_REQUEST, GET_USER_CHART_SUCCESS } from "../../actions/dashboard/types";

export const userChart = function (state = {}, action) {
  switch (action.type) {
    case GET_USER_CHART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_CHART_SUCCESS:
      return {
        ...state,
        loading: false,
        dataUserChart: action.payload,
      };
    case GET_USER_CHART_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const ageChart = function (state = {}, action) {
  switch (action.type) {
    case GET_AGE_CHART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_AGE_CHART_SUCCESS:
      return {
        ...state,
        loading: false,
        dataAgeChart: action.payload,
      };
    case GET_AGE_CHART_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const sesstionChart = function (state = {}, action) {
  switch (action.type) {
    case GET_SESSION_CHART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SESSION_CHART_SUCCESS:
      return {
        ...state,
        loading: false,
        dataSesstionChart: action.payload,
      };
    case GET_SESSION_CHART_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const activityChart = function (state = {}, action) {
  switch (action.type) {
    case GET_ACTIVITY_CHART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ACTIVITY_CHART_SUCCESS:
      return {
        ...state,
        loading: false,
        dataActivityChart: action.payload,
      };
    case GET_ACTIVITY_CHART_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const profitChart = function (state = {}, action) {
  switch (action.type) {
    case GET_PROFIT_CHART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFIT_CHART_SUCCESS:
      return {
        ...state,
        loading: false,
        dataProfitChart: action.payload,
      };
    case GET_PROFIT_CHART_FINALLY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
