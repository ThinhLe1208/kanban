import { call, put, takeLatest } from "redux-saga/effects";
import { GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SAGA, USER_SIGNIN_SAGA } from "redux/constants/JiraCloneConst";
import { hideLoading, showLoading } from "redux/reducers/uiControlReducer";
import { getUser, getUserByProjectId, setCurrentUser } from "redux/reducers/userReducer";
import { userService } from "services/userService";
import { ACCESS_TOKEN, CURRENT_USER, STATUS_CODE } from "util/constants/settingSystem";
import { history } from "util/history";
import { showNotification } from "util/notification";

function* signinSaga(action) {
    yield put(showLoading());

    try {
        const { data, status } = yield call(userService.signin, action.userSignin);
        if (status === STATUS_CODE.SUCCESS) {
            showNotification('success', 'Sign in successfully !');
            // save token and user info to localStorage
            if (action.isRemember) {
                localStorage.setItem(CURRENT_USER, JSON.stringify(data.content));
            }
            localStorage.setItem(ACCESS_TOKEN, data.content.accessToken);
            // save user info to redux store
            yield put(setCurrentUser(data.content));
            // navigate to home
            yield history.push("/project/management");
        }
    } catch (err) {
        console.error(err);
        showNotification('error', 'Sign in fail !');
    } finally {
        yield put(hideLoading());
    }
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