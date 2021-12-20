import { ADD_DATA_REQUEST } from "../types";

export const AddDataAction = (params) => {
  return {
    type: ADD_DATA_REQUEST,
    params,
  };
};
