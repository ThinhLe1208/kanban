import { call, delay, put, takeLatest } from "redux-saga/effects";
import { CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_ALL_PROJECT_SAGA, UPDATE_PROJECT_SAGA } from "redux/constants/JiraCloneConst";
import { hideLoading, showLoading } from "redux/reducers/LoadingReducer";
import { getProjectList } from "redux/reducers/ProjectReducer";
import { projectService } from "services/ProjectService";
import { STATUS_CODE } from "util/constants/settingSystem";
import { history } from "util/history";
import { getAllProjectSagaAction } from "./actions/ProjectAction";
import { hideDrawer } from "redux/reducers/DrawerReducer";
import { showNotification } from "util/Notification/notificationUntil";

function* createProjectSaga(action) {
    yield put(showLoading());
    yield delay(500);

    try {
        const { status } = yield call(projectService.createProjectAuthorization, action.newProject);
        if (status === STATUS_CODE.SUCCESS) {
            yield history.push('/project/management');
        }
    } catch (err) {
        console.log(err);
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
        console.log(err);
    }
}

export function* watchGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}

function* updateProjectSaga(action) {
    yield put(showLoading());
    yield delay(500);

    try {
        // const { status } = yield call(() => projectService.updateProject(action.updatedProject));
        const { status } = yield call(projectService.updateProject, action.updatedProject);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getAllProjectSagaAction());
            yield put(hideDrawer());
        }
    } catch (err) {
        console.log(err);
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
        console.log(err);
    }

    yield put(hideLoading());
}

export function* watchDeleteProjectSaga() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}