import { patch } from "./config.service";
const endpoint = "reject-credit";

export const patchNote = (callback, id) => {
    patch(endpoint, id, callback);
};

