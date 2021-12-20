import { Alert } from "react-native";
import { DELETE_DATA_FAILED, DELETE_DATA_SUCCESS } from "../types";
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETE_DATA_SUCCESS:
      Alert.alert(
        "Success",
        "Item Deleted!\n\nImportant: resource will not be really updated on the server but it will be faked as if."
      );
      return { deleteDataSuccess: true, deleteData: action.payload };

    case DELETE_DATA_FAILED:
      return { deleteDataSuccess: false, error: action.payload };

    default:
      return state;
  }
};
