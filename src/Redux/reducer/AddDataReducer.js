import { Alert } from "react-native";
import { ADD_DATA_FAILED, ADD_DATA_SUCCESS } from "../types";
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_DATA_SUCCESS:
      Alert.alert(
        "Success",
        "Add data success!\n\nImportant: resource will not be really updated on the server but it will be faked as if."
      );
      return { addDataSuccess: true, addData: action.payload };

    case ADD_DATA_FAILED:
      return { addDataSuccess: false, error: action.payload };

    default:
      return state;
  }
};
