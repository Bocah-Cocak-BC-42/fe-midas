import { get, del, put, post, getById, getAll } from "./config.service";
const endpoint = "roles";

export const GetAllRoles = (callback, errorCallback) => {
    getAll(endpoint + "/all", callback, errorCallback);
};

export const getRoles = (callback, errorCallback, params) => {
    get(endpoint, params, callback, errorCallback);
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