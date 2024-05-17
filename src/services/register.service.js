import { post } from "./config.service.js";

export const postRegister = (callback, data) => {
    post("user/AddCustomer", data, callback, null);
}