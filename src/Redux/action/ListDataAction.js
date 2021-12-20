import { LISTDATA_REQUEST } from "../types";

export const ListDataAction = (params) => {
  return {
    type: LISTDATA_REQUEST,
    params,
  };
};
