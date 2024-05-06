import { del, get, post, put } from "./config.service";
const provinceEndpoint = "province";
const cityEndpoint = "city";
const subdistrictEndpoint = "subdistrict";
const villageEndpoint = "village";

export const getAllProvince = (params, callback, errorCallback) => {
  get("province/all", params, callback, errorCallback);
};
export const getAllCity = (params, callback, errorCallback) => {
  get("city/provinceId", params, callback, errorCallback);
};
export const getAllSubDistrict = (params, callback, errorCallback) => {
  get("subdistrict/cityId", params, callback, errorCallback);
};
export const getAllVillage = (params, callback, errorCallback) => {
  get("village/subdistrictId", params, callback, errorCallback);
};

export const getProvince = (params, callback, errorCallback) => {
  get(provinceEndpoint, params, callback, errorCallback);
};
export const getCity = (params, callback, errorCallback) => {
  get(cityEndpoint, params, callback, errorCallback);
};

export const getSubDistrict = (params, callback, errorCallback) => {
  get(subdistrictEndpoint, params, callback, errorCallback);
};

export const getVillage = (params, callback, errorCallback) => {
  get(villageEndpoint, params, callback, errorCallback);
};

export const postProvince = (callback, messageValidationFieldError, data) => {
  post(provinceEndpoint, data, callback, messageValidationFieldError);
};

export const putProvince = (callback, id, data, messageValidationFieldError) => {
  put(provinceEndpoint, id, data, callback, messageValidationFieldError);
};

export const delProvince = (callback, id) => {
  del(provinceEndpoint, id, callback);
};
export const postCity = (callback, messageValidationFieldError, data) => {
  post(cityEndpoint, data, callback, messageValidationFieldError);
};

export const putCity = (callback, id, data, messageValidationFieldError) => {
  put(cityEndpoint, id, data, callback, messageValidationFieldError);
};

export const delCity = (callback, id) => {
  del(cityEndpoint, id, callback);
};
export const postSubdistrict = (callback, messageValidationFieldError, data) => {
  post(subdistrictEndpoint, data, callback, messageValidationFieldError);
};

export const putSubdistrict = (callback, id, data, messageValidationFieldError) => {
  put(subdistrictEndpoint, id, data, callback, messageValidationFieldError);
};

export const delSubdistrict = (callback, id) => {
  del(subdistrictEndpoint, id, callback);
};
export const postVillage = (callback, messageValidationFieldError, data) => {
  post(villageEndpoint, data, callback, messageValidationFieldError);
};

export const putVillage = (callback, id, data, messageValidationFieldError) => {
  put(villageEndpoint, id, data, callback, messageValidationFieldError);
};

export const delVillage = (callback, id) => {
  del(villageEndpoint, id, callback);
};