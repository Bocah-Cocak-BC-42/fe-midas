import { post } from "./config.service";
const endpoint = "auth";

export const postLogin = (callback, messageValidationFieldError, data) => {
  post(endpoint, data, callback, messageValidationFieldError);
};
