import { post, postFile } from "./config.service";

export const postDoc = (callback, messageValidationFieldError, data) => {
    postFile("file-managements", data, callback, messageValidationFieldError);
};

export const postUpgradeCredit = (callback, messageValidationFieldError, data) => {
    post("credit-upgrade", data, callback, messageValidationFieldError);
};