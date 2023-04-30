import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_PRIORITY_SAGA } from "redux/constants/JiraCloneConst";
import { setPriorityList } from "redux/reducers/PriorityReducer";
import { priorityService } from "services/PriorityService";
import { STATUS_CODE } from "util/constants/settingSystem";

function* getAllPriority(action) {
    try {
        const { data, status } = yield call(priorityService.getAllPriority, action.newProject);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(setPriorityList(data.content));
        }
    } catch (err) {
        console.error(err);
    }
}

export function* watchGetAllPrioritySaga() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPriority);
}