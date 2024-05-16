import { del, get, getById, post, put } from "./config.service";
const endpoint = "company-credit";

export const getCompanyCredits = (callback, errorCallback, params) => {
  get(endpoint, params, callback, errorCallback);
};

export const postCompanyCredit = (
  callback,
  messageValidationFieldError,
  data
) => {
  post(endpoint, data, callback, messageValidationFieldError);
};
