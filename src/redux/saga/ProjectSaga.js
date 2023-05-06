import { call, delay, put, takeLatest } from "redux-saga/effects";
import { ASSIGN_USER_PROJECT_SAGA, CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_ALL_PROJECT_SAGA, GET_PROJECT_DETAIL_SAGA, REMOVE_USER_PROJECT_SAGA, UPDATE_PROJECT_SAGA } from "redux/constants/JiraCloneConst";
import { hideLoading, showLoading } from "redux/reducers/uiControlReducer";
import { getProjectList, setProjectDetail } from "redux/reducers/projectReducer";
import { projectService } from "services/projectService";
import { STATUS_CODE } from "util/constants/settingSystem";
import { history } from "util/history";
import { getAllProjectSagaAction } from "./actions/projectAction";
import { hideOffcanvas } from "redux/reducers/offcanvasReducer";
import { showNotification } from "util/notification";

function* createProjectSaga(action) {
    yield put(showLoading());
    yield delay(500);

    try {
        const { status } = yield call(projectService.createProjectAuthorization, action.newProject);
        if (status === STATUS_CODE.SUCCESS) {
            showNotification('success', 'Success', 'Create project successfully !');
            yield history.push('/project/management');
        }
    } catch (err) {
        showNotification('error', 'Error', 'Create project fail !');
        console.error(err);
    }

    yield put(hideLoading());
}

export function* watchCreateProjectSaga() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

function* getAllProjectSaga() {
    try {
        const { data, status } = yield call(projectService.getAllProject);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getProjectList(data.content));
        }
    } catch (err) {
        console.error(err);
    }
}

export function* watchGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}

function* getProjectDetailSaga(action) {
    try {
        const { data, status } = yield call(projectService.getProjectDetail, action.projectId);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(setProjectDetail(data.content));
        }
    } catch (err) {
        console.error(err);
    }
}

export function* watchGetProjectDetailSaga() {
    yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}

function* updateProjectSaga(action) {
    yield put(showLoading());
    yield delay(500);

    try {
        const { status } = yield call(projectService.updateProject, action.updatedProject);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getAllProjectSagaAction());
            yield put(hideOffcanvas());
        }
    } catch (err) {
        console.error(err);
    }

    yield put(hideLoading());
}

export function* watchUpdateProjectSaga() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

function* deleteProjectSaga(action) {
    yield put(showLoading());
    yield delay(500);

    try {
        const { status } = yield call(projectService.deleteProject, action.id);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getAllProjectSagaAction());
            showNotification('success', 'Success', 'Delete project successfully !');
        }
    } catch (err) {
        showNotification('error', 'Error', 'Delete project fail !');
        console.error(err);
    }

    yield put(hideLoading());
}

export function* watchDeleteProjectSaga() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

function* assignUserProjectSaga(action) {
    yield put(showLoading());
    yield delay(500);

    try {
        const { status } = yield call(projectService.assignUserProject, action.userProject);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getAllProjectSagaAction());
            showNotification('success', 'Success', 'Add a member successfully !');
        }
    } catch (err) {
        showNotification('error', 'Error', 'Add a member fail !');
        console.error(err);
    }

    yield put(hideLoading());
}

export function* watchAssignUserProjectSaga() {
    yield takeLatest(ASSIGN_USER_PROJECT_SAGA, assignUserProjectSaga);
}

function* removeUserProjectSaga(action) {
    yield put(showLoading());
    yield delay(500);

    try {
        const { status } = yield call(projectService.removeUserProject, action.userProject);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getAllProjectSagaAction());
            showNotification('success', 'Success', 'Remove a member successfully !');
        }
    } catch (err) {
        showNotification('error', 'Error', 'Remove a member fail !');
        console.error(err);
    }

    yield put(hideLoading());
}

export function* watchRemoveUserProjectSaga() {
    yield takeLatest(REMOVE_USER_PROJECT_SAGA, removeUserProjectSaga);
}