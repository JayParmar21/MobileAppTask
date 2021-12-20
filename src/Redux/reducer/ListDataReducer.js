import { LISTDATA_FAILED, LISTDATA_SUCCESS } from "../types";
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LISTDATA_SUCCESS:
      return { listDataSuccess: true, data: action.payload };

    case LISTDATA_FAILED:
      return { listDataSuccess: false, error: action.payload };

    default:
      return state;
  }
};
