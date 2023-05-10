import { call, put, select, takeLatest } from "redux-saga/effects";
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
    try {
        const { data, status } = yield call(projectService.createProjectAuthorization, action.newProject);
        if (status === STATUS_CODE.SUCCESS) {
            showNotification('success', 'Create project successfully !');
            yield history.push(`/project/board/${data.content.id}`);
        }
    } catch (err) {
        if (err.response.status === STATUS_CODE.SERVICE_ERROR) {
            showNotification('error', 'Project name already exists !');
        } else {
            showNotification('error', 'Create project fail !');
        }
        console.error(err);
    }
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
    } finally {
        // get loading state from redux store
        const { isLoading } = yield select(state => state.uiControlReducer);
        if (isLoading) {
            yield put(hideLoading());
        }
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

    try {
        const { status } = yield call(projectService.updateProject, action.updatedProject);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(hideOffcanvas());
            yield put(getAllProjectSagaAction());
            // hide loading in getAllProjectSagaAction
            showNotification('success', 'Edit project successfully !');
        }
    } catch (err) {
        yield put(hideLoading());
        showNotification('error', 'Edit project fail !');
        console.error(err);
    }
}

export function* watchUpdateProjectSaga() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

function* deleteProjectSaga(action) {
    yield put(showLoading());

    try {
        const { status } = yield call(projectService.deleteProject, action.id);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getAllProjectSagaAction());
            // hide loading in getAllProjectSagaAction
            showNotification('success', 'Delete project successfully !');
        }
    } catch (err) {
        yield put(hideLoading());
        showNotification('error', 'Delete project fail !');
        console.error(err);
    }
}

export function* watchDeleteProjectSaga() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

function* assignUserProjectSaga(action) {
    yield put(showLoading());

    try {
        const { status } = yield call(projectService.assignUserProject, action.userProject);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getAllProjectSagaAction());
            // hide loading in getAllProjectSagaAction
            showNotification('success', 'Add member successfully !');
        }
    } catch (err) {
        yield put(hideLoading());
        if (err.response.data.statusCode === STATUS_CODE.FORBIDDEN) {
            showNotification('error', 'Insufficient permissions !');
        } else {
            showNotification('error', 'Add member fail !');
        }
        console.error(err);
    }
}

export function* watchAssignUserProjectSaga() {
    yield takeLatest(ASSIGN_USER_PROJECT_SAGA, assignUserProjectSaga);
}

function* removeUserProjectSaga(action) {
    yield put(showLoading());

    try {
        const { status } = yield call(projectService.removeUserProject, action.userProject);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getAllProjectSagaAction());
            // hide loading in getAllProjectSagaAction
            showNotification('success', 'Remove member successfully !');
        }
    } catch (err) {
        yield put(hideLoading());
        if (err.response.data.statusCode === STATUS_CODE.FORBIDDEN) {
            showNotification('error', 'Insufficient permissions !');
        } else {
            showNotification('error', 'Remove member fail !');
        }
        console.error(err);
    }
}

export function* watchRemoveUserProjectSaga() {
    yield takeLatest(REMOVE_USER_PROJECT_SAGA, removeUserProjectSaga);
}