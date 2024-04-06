import axios from "axios";

const token = () => {
  if (localStorage.getItem("user") ) {
    return {
      "Accept": "Application/json",
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
      'grant_type': 'refresh_token',
      'client_id': 'abcdefg',
      'client_secret': 'hijklmn',
      'refresh_token': 'opqrstuvw',
      "language":'ar' ,
    };
  }
  return {
    "Accept": "application/json",
  };
};

const axiosApp = axios.create({
  baseURL: "https://malath.onrender.com/api/v1/",
  headers: { "Access-Control-Allow-Origin": "", ...token() },
});

axiosApp.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("user");

      window.location.reload();
    }

    return error;
  },
);

export default axiosApp;
