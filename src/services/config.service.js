import axios from "axios";
import Cookies from "js-cookie";

const user = JSON.parse(Cookies.get("user") ?? null);
let token = user?.token;

export const get = (endpoint, params, callback, errorCallback) => {
  axios
    .get(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
      params: params, headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(async (res) => {
      callback(await res.data);
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
    .then(async (res) => {
      callback(await res.data);
    })
    .catch((err) => {
      errorCallback(err.response.data.message);
    });
};

export const getById = (endpoint, id, callback) => {
  axios
    .get(`${import.meta.env.VITE_BASE_URL}${endpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(async (res) => {
      callback(await res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const post = (endpoint, data, callback, messageValidationFieldError) => {
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
    .then(async (res) => {
      token = await res.data.token;
      callback(token ? await res.data : await res.data.message);
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
    .put(`${import.meta.env.VITE_BASE_URL}${endpoint}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(async (res) => {
      callback(await res.data.message);
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
        },
      })
    .then(async (res) => {
      callback(await res.data.message);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const del = (endpoint, id, callback) => {
  axios
    .delete(`${import.meta.env.VITE_BASE_URL}${endpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(async (res) => {
      callback(await res.data.message);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postFile = (endpoint, data, callback, messageValidationFieldError) => {
  axios
    .post(
      `${import.meta.env.VITE_BASE_URL}${endpoint}`,
      data,
      token != null
        ? {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
        : null
    )
    .then(async (res) => {
      callback(await res.data);
    })
    .catch((err) => {
      console.log(err)
      messageValidationFieldError(
        err.response.data.errors ?? err.response.data.message
      );
    });
};
