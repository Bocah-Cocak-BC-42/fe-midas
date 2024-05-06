import { get, post, put, del } from "./config.service";
const endPointEmployee = "user/GetAllEmployees";
const endPointCustomer = "user/GetAllCustomers";

export const getEmployees = (callback,errorCallback, params) => {
    get(endPointEmployee, params, callback, errorCallback);
  };

export const getCustomer = (callback, params) => {
    get(endPointCustomer, params, callback);
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

export const DelEmployee = (callback, id) => {
  del("User/DeleteEmployee", id, callback);
};
