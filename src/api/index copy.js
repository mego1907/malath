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
      "Accept-Language":'ar' ,
    };
  }
  return {
    "Accept": "application/json",
  };
};

const axiosApp2 = axios.create({
  headers: { "Access-Control-Allow-Origin": "", ...token() },
});

export default axiosApp2;
