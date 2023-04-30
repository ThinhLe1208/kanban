import { call, delay, put, takeLatest } from "redux-saga/effects";
import { CREATE_TASK_SAGA } from "redux/constants/JiraCloneConst";
import { hideDrawer } from "redux/reducers/DrawerReducer";
import { hideLoading, showLoading } from "redux/reducers/LoadingReducer";
import { taskService } from "services/TaskService";
import { showNotification } from "util/Notification/notificationUntil";
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
        showNotification('error', 'Error', 'Create task fail !');
        console.error(err);
    }

    yield put(hideLoading());
}

export function* watchCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_SAGA, createTask);
}