import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_TASK_SAGA, GET_TASK_DETAIL_SAGA, UPDATE_ORIGINAL_ESTIMATE_SAGA, UPDATE_PRIORITY_SAGA, UPDATE_STATUS_SAGA, UPDATE_TASK_DESCRIPTION_SAGA, UPDATE_TASK_SAGA, UPDATE_TIME_TRACKING_SAGA } from "redux/constants/JiraCloneConst";
import { hideOffcanvas } from "redux/reducers/offcanvasReducer";
import { hideLoading, showLoading } from "redux/reducers/uiControlReducer";
import { taskService } from "services/taskService";
import { showNotification } from "util/notification";
import { STATUS_CODE } from "util/constants/settingSystem";
import { setTaskDetail } from "redux/reducers/taskReducer";
import { getProjectDetailSagaAction } from "./actions/projectAction";
import { getTaskDetailSagaAction } from "./actions/taskAction";

function* createTaskSaga(action) {
    yield put(showLoading());

    try {
        const { status } = yield call(taskService.createTask, action.newTask);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(hideOffcanvas());
            yield put(getProjectDetailSagaAction(action.newTask.projectId));
            showNotification('success', 'Success', 'Create task successfully !');
        }
    } catch (err) {
        console.error(err);
        if (err.response?.data.statusCode === STATUS_CODE.SERVICE_ERROR) {
            showNotification('error', 'Task already exists !');
        } else if (err.response?.data.statusCode === STATUS_CODE.FORBIDDEN) {
            showNotification('error', 'Insufficient permissions !');
        } else {
            showNotification('error', 'Create task fail !');
        }
    } finally {
        yield put(hideLoading());
    }
}

export function* watchCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

function* getTaskDetailSaga(action) {
    try {
        const { data, status } = yield call(taskService.getTaskDetail, action.taskId);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(setTaskDetail(data.content));
        }
    } catch (err) {
        console.error(err);
    }
}

export function* watchGetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

function* updateTaskSaga(action) {
    try {
        const { data, status } = yield call(taskService.updateTask, action.updatedTask);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(setTaskDetail(data.content));
            // reload project page to adjust issues in columns
            yield put(getProjectDetailSagaAction(data.content.projectId));
        }
    } catch (err) {
        console.error(err);
    }
}

export function* watchUpdateTaskSaga() {
    yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
}

function* updateTaskDescriptionSaga(action) {
    try {
        const { status } = yield call(taskService.updateTaskDescription, action.data);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getTaskDetailSagaAction(action.data.taskId));
        }
    } catch (err) {
        console.error(err);
        if (err.response?.data.content === 'user is not assign!') {
            showNotification('error', 'You are not the assigned person !');
        }
    }
}

export function* watchUpdateTaskDescriptionSaga() {
    yield takeLatest(UPDATE_TASK_DESCRIPTION_SAGA, updateTaskDescriptionSaga);
}

function* updateStatusSaga(action) {
    try {
        const { status } = yield call(taskService.updateStatus, action.data);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getTaskDetailSagaAction(action.data.taskId));
            yield put(getProjectDetailSagaAction(action.projectId));
        }
    } catch (err) {
        console.error(err);
    }
}

export function* watchUpdateStatusSaga() {
    yield takeLatest(UPDATE_STATUS_SAGA, updateStatusSaga);
}

function* updatePrioritySaga(action) {
    try {
        const { status } = yield call(taskService.updatePriority, action.data);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getTaskDetailSagaAction(action.data.taskId));
            yield put(getProjectDetailSagaAction(action.projectId));
        }
    } catch (err) {
        console.error(err);
    }
}

export function* watchUpdatePrioritySaga() {
    yield takeLatest(UPDATE_PRIORITY_SAGA, updatePrioritySaga);
}

function* updateOriginalEstimateSaga(action) {
    try {
        const { status } = yield call(taskService.updateOriginalEstimate, action.data);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getTaskDetailSagaAction(action.data.taskId));
            yield put(getProjectDetailSagaAction(action.projectId));
        }
    } catch (err) {
        console.error(err);
    }
}

export function* watchUpdateOriginalEstimateSaga() {
    yield takeLatest(UPDATE_ORIGINAL_ESTIMATE_SAGA, updateOriginalEstimateSaga);
}

function* updateTimeTrackingSaga(action) {
    try {
        const { status } = yield call(taskService.updateTimeTracking, action.data);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getTaskDetailSagaAction(action.data.taskId));
            yield put(getProjectDetailSagaAction(action.projectId));
        }
    } catch (err) {
        console.error(err);
    }
}

export function* watchUpdateTimeTrackingSaga() {
    yield takeLatest(UPDATE_TIME_TRACKING_SAGA, updateTimeTrackingSaga);
}
