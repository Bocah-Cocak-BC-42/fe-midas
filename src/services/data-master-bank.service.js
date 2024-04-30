import { del, get, post, put } from "./config.service";
const endpoint = "bank";

export const getBanks = (callback, params) => {
  get(endpoint, params, callback);
};
export const getBankById = (callback, id) => {
  get(endpoint, id, callback);
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
