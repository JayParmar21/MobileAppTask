import { Alert } from "react-native";
import { EDIT_DATA_FAILED, EDIT_DATA_SUCCESS } from "../types";
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDIT_DATA_SUCCESS:
      Alert.alert(
        "Success",
        "Edit data success!\n\nImportant: resource will not be really updated on the server but it will be faked as if."
      );
      return { addDataSuccess: true, addData: action.payload };

    case EDIT_DATA_FAILED:
      return { addDataSuccess: false, error: action.payload };

    default:
      return state;
  }
};
