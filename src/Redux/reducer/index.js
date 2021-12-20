import { combineReducers } from "redux";
import ListDataReducer from "./ListDataReducer";
import AddDataReducer from "./AddDataReducer";
import DeleteDataReducer from "./DeleteDataReducer";
import EditDataReducer from "./EditDataReducer";
export default combineReducers({
  ListData: ListDataReducer,
  AddData: AddDataReducer,
  DeleteData: DeleteDataReducer,
  EditData: EditDataReducer,
});
