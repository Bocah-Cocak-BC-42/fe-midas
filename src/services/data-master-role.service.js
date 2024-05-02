import { get, del, put, post, getById } from "./config.service";
const endpoint = "roles";

export const getRoles = (callback, params) => {
    get(endpoint, params, callback);
}; 
export const getRoleById = (callback, id) => {
    getById(endpoint, id, callback);
};
export const postRole = (callback, messageValidationFieldError, data) => {
    post(endpoint, data, callback, messageValidationFieldError);
};
export const putRole = (callback, id, data, messageValidationFieldError) => {
    put(endpoint, id, data, callback, messageValidationFieldError);
};
export const delRole = (callback, id) => {
    del(endpoint, id, callback);
};