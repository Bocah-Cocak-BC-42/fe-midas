import { get } from "./config.service";
const endpoint = "user";

export const getUserDetail = (callback, errorCallback, params) => {
  get(`${endpoint}/get-user-detail`, params, callback, errorCallback);
};
