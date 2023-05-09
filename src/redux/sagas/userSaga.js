import { call, put, takeLatest } from "redux-saga/effects";
import { GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SAGA, USER_SIGNIN_SAGA, USER_SIGNUP_SAGA } from "redux/constants/JiraCloneConst";
import { hideLoading, showLoading } from "redux/reducers/uiControlReducer";
import { getUser, getUserByProjectId, setCurrentUser } from "redux/reducers/userReducer";
import { userService } from "services/userService";
import { ACCESS_TOKEN, CURRENT_USER, REMEMBER_USER, STATUS_CODE } from "util/constants/settingSystem";
import { history } from "util/history";
import { showNotification } from "util/notification";

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

function* signInSaga(action) {
    yield put(showLoading());

    try {
        const { data, status } = yield call(userService.signIn, action.userSignIn);
        if (status === STATUS_CODE.SUCCESS) {
            showNotification('success', 'Sign in successfully !');
            // save token , user and remember info to localStorage
            localStorage.setItem(CURRENT_USER, JSON.stringify(data.content));
            localStorage.setItem(ACCESS_TOKEN, data.content.accessToken);
            localStorage.setItem(REMEMBER_USER, action.isRemember);
            // save user info to redux store
            yield put(setCurrentUser(data.content));
            // navigate to project manament
            yield history.push("/project/management");
        }
    } catch (err) {
        console.error(err);
        showNotification('error', 'Sign in fail !');
        yield put(hideLoading());
    }
}

export function* watchSignInSaga() {
    yield takeLatest(USER_SIGNIN_SAGA, signInSaga);
}

function* signUpSaga(action) {
    yield put(showLoading());

    try {
        const { data, status } = yield call(userService.signUp, action.userSignUp);
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data);
            showNotification('success', 'Sign up successfully !');
            // navigate to signin
            yield history.push("/signin");
        }
    } catch (err) {
        console.error(err);
        if (err.response?.status === STATUS_CODE.NOT_FOUND) {
            showNotification('error', 'Email is already exist !');
        } else {
            showNotification('error', 'Sign up fail !');
        }
    } finally {
        yield put(hideLoading());
    }
}

export function* watchSignUpSaga() {
    yield takeLatest(USER_SIGNUP_SAGA, signUpSaga);
}
