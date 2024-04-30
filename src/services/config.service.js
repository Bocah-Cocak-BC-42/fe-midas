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

export const getById = (endpoint, id, callback) => {
  axios
    .get(`${import.meta.env.VITE_BASE_URL}${endpoint}/${id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const post = (endpoint, data, callback, messageValidationFieldError) => {
  axios
    .post(`${import.meta.env.VITE_BASE_URL}${endpoint}`, data)
    .then((res) => {
      console.log(res);
      console.log(res.data.message);
      callback(res.data.message);
    })
    .catch((err) => {
      console.log(err);
      messageValidationFieldError(err.response.data.errors);
    });
};

export const put = (
  endpoint,
  id,
  data,
  callback,
  messageValidationFieldError
) => {
  axios
    .put(`${import.meta.env.VITE_BASE_URL}${endpoint}/${id}`, data)
    .then((res) => {
      callback(res.message);
    })
    .catch((err) => {
      console.log(err);
      messageValidationFieldError(err.response.data.errors);
    });
};

export const del = (endpoint, id, callback) => {
  axios
    .delete(`${import.meta.env.VITE_BASE_URL}${endpoint}/${id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
