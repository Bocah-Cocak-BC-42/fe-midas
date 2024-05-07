import { get, post, put, del, patch } from "./config.service";
const endPointEmployee = "user/GetAllEmployees";
const endPointCustomer = "user/GetAllCustomers";

export const getEmployees = (callback,errorCallback, params) => {
    get(endPointEmployee, params, callback, errorCallback);
  };

export const getCustomers = (callback,errorCallback, params) => {
    get(endPointCustomer, params, callback, errorCallback);
};

export const getEmployeeById = (callback, params) => {
  get("user/GetUserDetail", params, callback);
};

export const PostNewCustomer = (callback, messageValidationFieldError, data) => {
  post("user/AddCustomers", data, callback, messageValidationFieldError);
};

export const PostNewEmployee = (callback, messageValidationFieldError, data) => {
  post("user/AddEmployee", data, callback, messageValidationFieldError);
};

export const putEmployee = (callback, id, data, messageValidationFieldError) => {
  put("user/UpdateEmployee", id, data, callback, messageValidationFieldError);
}

export const putCustomer = (callback, id, data, messageValidationFieldError) => {
  put("user/UpdateCustomer", id, data, callback, messageValidationFieldError);
}

export const patchResetPassword =(callback, id)=>{
  patch("user/ResetPassword", id, callback);
 }

export const DelUser = (callback, id) => {
  del("User/DeleteUser", id, callback);
};
