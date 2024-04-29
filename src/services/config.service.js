import axios from "axios";
export const get = (endpoint, params, callback) => {
  axios
    .get(`${import.meta.env.VITE_BASE_URL}${endpoint}`, { params: params })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
