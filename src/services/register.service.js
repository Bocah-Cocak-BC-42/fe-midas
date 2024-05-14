import { post } from "./config.service.js";

export const postRegister = (callback, data) => {
  post("user/add-customer", data, callback, null);
};
