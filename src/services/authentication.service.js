import { get, post } from "./config.service";
const endpoint = "auth";
const endPointUser = 'user';

export const postLogin = (callback, messageValidationFieldError, data) => {
  post(endpoint, data, callback, messageValidationFieldError);
};

export const GetCurrentLogin = (callback, errorCallback, params) => {
  get(endPointUser + "/get-user-detail", params, callback, errorCallback);
}