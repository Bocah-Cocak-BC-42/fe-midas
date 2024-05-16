import { del, get, getById, post, put } from "./config.service";
const endpoint = "branch-office";

export const getAllKantorCabang = (callback, errorCallback) => {
  get(`${endpoint}/all`, {}, callback, errorCallback);
};
export const getKantorCabang = (callback, errorCallback, params) => {
  get(endpoint, params, callback, errorCallback);
};
export const getKantorCabangById = (callback, id) => {
  getById(endpoint, id, callback);
};

export const postKantorCabang = (
  callback,
  messageValidationFieldError,
  data
) => {
  post(endpoint, data, callback, messageValidationFieldError);
};

export const putKantorCabang = (
  callback,
  id,
  data,
  messageValidationFieldError
) => {
  put(endpoint, id, data, callback, messageValidationFieldError);
};

export const deleteKantorCabang = (callback, id) => {
  del(endpoint, id, callback);
};
