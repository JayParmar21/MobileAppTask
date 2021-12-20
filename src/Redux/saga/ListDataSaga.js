import { put, call, takeEvery } from "redux-saga/effects";
import { LISTDATA_FAILED, LISTDATA_REQUEST, LISTDATA_SUCCESS } from "../types";
import Api from "../../Config/Api";

export function* FetchListData({ params }) {
  try {
    const response = yield call(Api.GetListData, params);
    yield put({ type: LISTDATA_SUCCESS, payload: response });
  } catch (e) {
    yield put({ type: LISTDATA_FAILED, payload: e });
  }
}

export function* ListDataSaga() {
  yield takeEvery(LISTDATA_REQUEST, FetchListData);
}
export default ListDataSaga;
