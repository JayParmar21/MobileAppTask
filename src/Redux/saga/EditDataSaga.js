import { put, call, takeEvery } from "redux-saga/effects";
import {
  EDIT_DATA_FAILED,
  EDIT_DATA_REQUEST,
  EDIT_DATA_SUCCESS,
} from "../types";
import Api from "../../Config/Api";

export function* FetchEditData({ params }) {
  try {
    const response = yield call(Api.EditListData, params);
    yield put({ type: EDIT_DATA_SUCCESS, payload: response });
  } catch (e) {
    yield put({ type: EDIT_DATA_FAILED, payload: e });
  }
}

export function* EditDataSaga() {
  yield takeEvery(EDIT_DATA_REQUEST, FetchEditData);
}
export default EditDataSaga;
