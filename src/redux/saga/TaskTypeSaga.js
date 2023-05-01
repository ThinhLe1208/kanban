import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_TASK_TYPE_SAGA } from "redux/constants/JiraCloneConst";
import { setAllTaskType } from "redux/reducers/taskTypeReducer";
import { taskTypeService } from "services/taskTypeService";
import { STATUS_CODE } from "util/constants/settingSystem";

function* getAllTaskType(action) {
    try {
        const { data, status } = yield call(taskTypeService.getAllTaskType);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(setAllTaskType(data.content));
        }
    } catch (err) {
        console.error(err);
    }
}

export function* watchGetAllTaskType() {
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskType);
}