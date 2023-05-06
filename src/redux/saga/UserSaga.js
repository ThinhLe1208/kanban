import { call, delay, put, takeLatest } from "redux-saga/effects";
import { GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SAGA, USER_SIGNIN_SAGA } from "redux/constants/JiraCloneConst";
import { hideLoading, showLoading } from "redux/reducers/uiControlReducer";
import { getUser, getUserByProjectId, userSignin } from "redux/reducers/userReducer";
import { userService } from "services/userService";
import { ACCESS_TOKEN, CURRENT_USER, STATUS_CODE } from "util/constants/settingSystem";
import { history } from "util/history";

function* signinSaga(action) {
    yield put(showLoading());
    yield delay(500);

    try {
        const { data, status } = yield call(userService.signin, action.userSignin);
        if (status === STATUS_CODE.SUCCESS) {
            // save token and user info to localStorage
            localStorage.setItem(ACCESS_TOKEN, data.content.accessToken);
            localStorage.setItem(CURRENT_USER, JSON.stringify(data.content));
            // save user info to redux store
            yield put(userSignin(data.content));
            // navigate to home
            yield history.push("/home");
        }
    } catch (err) {
        console.error(err);
    }

    yield put(hideLoading());
}

export function* watchSigninSaga() {
    yield takeLatest(USER_SIGNIN_SAGA, signinSaga);
}

function* getUserSaga(action) {
    try {
        const { data, status } = yield call(userService.getUser, action.keyword);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getUser(data.content));
        }
    } catch (err) {
        console.error(err);
    }
}

export function* watchGetUserSaga() {
    yield takeLatest(GET_USER_SAGA, getUserSaga);
}

function* getUserByProjectIdSaga(action) {
    try {
        const { data, status } = yield call(userService.getUserByProjectId, action.projectId);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getUserByProjectId(data.content));
        }
    } catch (err) {
        console.error(err);
        if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
            yield put(getUserByProjectId([]));
        }
    }
}

export function* watchGetUserByProjectIdSaga() {
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}