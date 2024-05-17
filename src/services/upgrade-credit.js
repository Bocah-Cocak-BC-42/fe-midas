import { get,getById, patchBody, post, postFile } from "./config.service";


export const GetUpgrades = (callback, errorCallback, params) => {
    get("credit-upgrade", params, callback, errorCallback);
};

export const getUpgradeById = (callback, id) => {
    getById("credit-upgrade", id, callback);
  };

  export const getDoc = (callback, id) => {
      getById("file-managements", id, callback);
  }

export const ApproveUpgrade = (callback, data)=>{
    patchBody("credit-upgrade/approve", data, callback)
}

export const RejectUpgrade = (callback, data)=>{
    patchBody("credit-upgrade/reject", data, callback)
}

export const postDoc = (callback, messageValidationFieldError, data) => {
    postFile("file-managements", data, callback, messageValidationFieldError);
};

export const postUpgradeCredit = (callback, messageValidationFieldError, data) => {
    post("credit-upgrade", data, callback, messageValidationFieldError);
};