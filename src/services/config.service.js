import axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6IkFkbWluIiwidXNlcklkIjoiNDFkZmFkYTUtNmM1My00YzdiLThjMDctODkwMzdlNTExODc0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MTQ3MjMzMjB9.x9WBT3Yja6L5iLn07227oMmL8L5kDNOAGszRpiyu0So";

export const get = (endpoint, params, callback, errorCallback) => {
  axios
    .get(`${import.meta.env.VITE_BASE_URL}${endpoint}`, { params: params, headers: {
      Authorization: `Bearer ${token}`
    }})
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
  axios
    .post(`${import.meta.env.VITE_BASE_URL}${endpoint}`, data, { headers: {
      Authorization: `Bearer ${token}`
    }})
    .then((res) => {
      callback(res.data.message);
    })
    .catch((err) => {
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
