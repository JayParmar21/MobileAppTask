import { EDIT_DATA_REQUEST } from "../types";

export const EditDataAction = (params) => {
  return {
    type: EDIT_DATA_REQUEST,
    params,
  };
};
