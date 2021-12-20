import { put, call, takeEvery } from "redux-saga/effects";
import { ADD_DATA_FAILED, ADD_DATA_REQUEST, ADD_DATA_SUCCESS } from "../types";
import Api from "../../Config/Api";

export function* FetchAddData({ params }) {
  try {
    const response = yield call(Api.AddListData, params);
    yield put({ type: ADD_DATA_SUCCESS, payload: response });
  } catch (e) {
    yield put({ type: ADD_DATA_FAILED, payload: e });
  }
}

export function* AddDataSaga() {
  yield takeEvery(ADD_DATA_REQUEST, FetchAddData);
}
export default AddDataSaga;
