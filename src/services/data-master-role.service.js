import { get } from "./config.service";

export const getRoles = (callback, params) => 
{
    get("roles", params, callback);
}; 