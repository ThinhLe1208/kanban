import { statusService } from "services/StatusService";
import { STATUS_CODE } from "util/constants/settingSystem";
import { takeLatest, call, put } from "redux-saga/effects";
import { GET_ALL_STATUS_SAGA } from "redux/constants/JiraCloneConst";
import { setStatusList } from "redux/reducers/StatusReducer";

function* getAllStatusSaga() {
    try {
        const { data, status } = yield call(statusService.getAllStatus);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(setStatusList(data.content));
        }
    } catch (err) {
        console.error(err);
    }
}

export function* watchGetAllStatusSaga() {
    yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
}