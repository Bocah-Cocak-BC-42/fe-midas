import { get, post, put, del, patch } from "./config.service";
const endPointEmployee = "user/get-all-employees";
const endPointCustomer = "user/get-all-customers";
const endPointUser = "user/get-all"

export const getAllUser = (callback, errorCallback) => {
  get(endPointUser, callback, errorCallback);
};

export const getEmployees = (callback,errorCallback, params) => {
    get(endPointEmployee, params, callback, errorCallback);
  };

export const getCustomers = (callback,errorCallback, params) => {
    get(endPointCustomer, params, callback, errorCallback);
};

export const getEmployeeById = (callback, params) => {
  get("user/get-user-detail", params, callback);
};

export const PostNewCustomer = (callback, messageValidationFieldError, data) => {
  post("user/add-customer", data, callback, messageValidationFieldError);
};

export const PostNewEmployee = (callback, messageValidationFieldError, data) => {
  post("user/add-employee", data, callback, messageValidationFieldError);
};

export const putEmployee = (callback, id, data, messageValidationFieldError) => {
  put("user/update-employee", id, data, callback, messageValidationFieldError);
}

export const putCustomer = (callback, id, data, messageValidationFieldError) => {
  put("user/update-customer", id, data, callback, messageValidationFieldError);
}

export const patchResetPassword =(callback, id)=>{
  patch("user/reset-password", id, callback);
 }

export const DelUser = (callback, id) => {
  del("user/delete-user", id, callback);
};
