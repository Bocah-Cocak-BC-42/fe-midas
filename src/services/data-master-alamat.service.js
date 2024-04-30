import { get } from "./config.service";

export const getProvince = (callback, params) => {
  get("province", params, callback);
};

export const getCity = (callback, params) => {
  get("city", params, callback);
};

export const getSubDistrict = (callback, params) => {
  get("subdistrict", params, callback);
};

export const getVillage = (callback, params) => {
  get("village", params, callback);
};