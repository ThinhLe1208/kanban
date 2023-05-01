import { call, delay, put, takeLatest } from "redux-saga/effects";
import { CREATE_TASK_SAGA } from "redux/constants/JiraCloneConst";
import { hideDrawer } from "redux/reducers/drawerReducer";
import { hideLoading, showLoading } from "redux/reducers/loadingReducer";
import { taskService } from "services/taskService";
import { showNotification } from "util/notification";
import { STATUS_CODE } from "util/constants/settingSystem";

function* createTask(action) {
    yield put(showLoading());
    yield delay(2000);

    try {
        const { status } = yield call(taskService.createTask, action.newTask);
        if (status === STATUS_CODE.SUCCESS) {
            showNotification('success', 'Success', 'Create task successfully !');
            yield put(hideDrawer());
        }
    } catch (err) {
        console.error(err);
        if (err.response?.data.statusCode === STATUS_CODE.SERVICE_ERROR) {
            showNotification('error', 'Error', 'Task already exists !');
        } else {
            showNotification('error', 'Error', 'Create task exists !');
        }
    }

    yield put(hideLoading());
}

export function* watchCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_SAGA, createTask);
}