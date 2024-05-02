import { get, getById, post, put, del } from "./config.service";
const endpoint = "business-sector";

export const getSektorUsaha = (callback, errorCallback,params) => {
    get(endpoint, params, callback, errorCallback);
}

export const getSektorById = (id, callback) => {
    getById(endpoint, id, callback);
}

export const insertSektor = (callback, messageValidationFieldError, data) => {
    post(endpoint, data, callback, messageValidationFieldError)
}

export const updateSektor = (callback, id, data, messageValidationFieldError) => {
    put(endpoint, id, data, callback, messageValidationFieldError)
}

export const deleteSektor = (id, callback) => {
    del(endpoint, id, callback);
}