import { get } from "./config.service";

export const getBanks = (callback, params) => {
  get("bank", params, callback);
};
