import { del, get, getById, post, put } from "./config.service";
const endpoint = "bank";

export const getBanks = (callback, errorCallback, params) => {
  get(endpoint, params, callback, errorCallback);
};
export const getBankById = (callback, id) => {
  getById(endpoint, id, callback);
};
export const postBank = (callback, messageValidationFieldError, data) => {
  post(endpoint, data, callback, messageValidationFieldError);
};
export const putBank = (callback, id, data, messageValidationFieldError) => {
  put(endpoint, id, data, callback, messageValidationFieldError);
};
export const delBank = (callback, id) => {
  del(endpoint, id, callback);
};
