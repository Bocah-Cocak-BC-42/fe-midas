import { get } from "./config.service";
const endPointEmployee = "user/GetAllEmployees";
const endPointCustomer = "user/GetAllCustomers"
export const getEmployees = (callback, params) => {
    get(endPointEmployee, params, callback);
  };

export const getCustomer = (callback, params) => {
    get(endPointCustomer, params, callback);
};

export const getEmployeeById = (callback, id) => {
  get(endpoint, id, callback);
};

export const PostNewEmployee = (callback, messageValidationFieldError, data) => {
  post("user/AddCustomers", data, callback, messageValidationFieldError);
};

