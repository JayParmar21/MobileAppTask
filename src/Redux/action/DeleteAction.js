import { DELETE_DATA_REQUEST } from "../types";

export const DeleteDataAction = (params) => {
  return {
    type: DELETE_DATA_REQUEST,
    params,
  };
};
