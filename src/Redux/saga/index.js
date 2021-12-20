import { all } from "redux-saga/effects";
import AddDataSaga from "./AddDataSaga";
import DeleteDataSaga from "./DeleteSaga";
import EditDataSaga from "./EditDataSaga";
import ListDataSaga from "./ListDataSaga";

export default function* rootSaga() {
  yield all([ListDataSaga(), AddDataSaga(), DeleteDataSaga(), EditDataSaga()]);
}
