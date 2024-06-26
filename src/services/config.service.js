import axios from "axios";
import Cookies from "js-cookie";

const user = JSON.parse(Cookies.get("user") ?? null);
let token = user?.token;

export const get = (endpoint, params, callback, errorCallback) => {
  axios
    .get(`${import.meta.env.VITE_BASE_URL}${endpoint}`, { params: params, headers: {
      Authorization: `Bearer ${token}`
    }})
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
      errorCallback(err.response.data.message);
    });
};

export const getAll = (endpoint, callback, errorCallback) => {
  axios
    .get(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      errorCallback(err.response.data.message);
    });
};

export const getById = (endpoint, id, callback) => {
  axios
    .get(`${import.meta.env.VITE_BASE_URL}${endpoint}/${id}`, { headers: {
      Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const post = (endpoint, data, callback, messageValidationFieldError) => {
  console.log(token);
  axios
    .post(
      `${import.meta.env.VITE_BASE_URL}${endpoint}`,
      data,
      token != null
        ? {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        : null
    )
    .then((res) => {
      token = res.data.token;
      callback(token ? res.data : res.data.message);
    })
    .catch((err) => {
      messageValidationFieldError(
        err.response.data.errors ?? err.response.data.message
      );
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
    .put(`${import.meta.env.VITE_BASE_URL}${endpoint}/${id}`, data, { headers: {
      Authorization: `Bearer ${token}`
    }})
    .then((res) => {
      callback(res.data.message);
    })
    .catch((err) => {
      messageValidationFieldError(err.response.data.errors);
    });
};

export const patch = (
  endpoint,
  id,
  callback
) => {
  axios
    .patch(`${import.meta.env.VITE_BASE_URL}${endpoint}/${id}`,
    {},
  {
    headers: {
      Authorization: "Bearer " + token,
    },})
    .then((res) => {
      callback(res.data.message);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const del = (endpoint, id, callback) => {
  axios
    .delete(`${import.meta.env.VITE_BASE_URL}${endpoint}/${id}`, {headers: {
      Authorization: `Bearer ${token}`}})
    .then((res) => {
      callback(res.data.message);
    })
    .catch((err) => {
      console.log(err);
    });
};
