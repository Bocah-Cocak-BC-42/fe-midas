import { del, get, getById, getByIdWithPagination, post, put } from "./config.service";
const endpoint = "branch-office";
const endPointEmployeBrancOffice = "associate-user-branch";

export const getKantorCabang = (callback, errorCallback, params) =>{
    get(endpoint, params, callback, errorCallback);
};
export const getKantorCabangById = (callback, id, params) => {
    getByIdWithPagination(endpoint, id,params, callback)
};

export const postKantorCabang = (callback, messageValidationFieldError, data) => {
    post(endpoint, data, callback, messageValidationFieldError);
}

export const putKantorCabang = (callback, id, data, messageValidationFieldError) => {
    put(endpoint, id, data, callback, messageValidationFieldError);
}

export const deleteKantorCabang = (callback, id) =>{
    del(endpoint, id, callback);
}

export const postEmployeeBranchOffice = (callback, messageValidationFieldError, data) => {
    post(endPointEmployeBrancOffice, data, callback, messageValidationFieldError)
}

export const deleteEmployeeBranchOffice = (callback, id) => {
    del(endPointEmployeBrancOffice, id, callback);
}