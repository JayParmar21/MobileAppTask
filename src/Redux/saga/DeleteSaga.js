import { put, call, takeEvery } from "redux-saga/effects";
import {
  DELETE_DATA_FAILED,
  DELETE_DATA_REQUEST,
  DELETE_DATA_SUCCESS,
} from "../types";
import Api from "../../Config/Api";

export function* DeleteListData({ params }) {
  try {
    const response = yield call(Api.DeleteListData, params);
    yield put({ type: DELETE_DATA_SUCCESS, payload: response });
  } catch (e) {
    yield put({ type: DELETE_DATA_FAILED, payload: e });
  }
}

export function* DeleteDataSaga() {
  yield takeEvery(DELETE_DATA_REQUEST, DeleteListData);
}
export default DeleteDataSaga;
