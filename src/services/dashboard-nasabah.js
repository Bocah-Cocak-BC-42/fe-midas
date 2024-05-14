import { get } from "./config.service";

export const getUserDetail = (params, callback, errorCallback) => {
    get("user/get-user-detail", params, callback, errorCallback);
};

export const getSubmissions = (params, callback, errorCallback) => {
    get("", params, callback, errorCallback);
};

export const getLoans = (params, callback, errorCallback) => {
    get("", params, callback, errorCallback);
};