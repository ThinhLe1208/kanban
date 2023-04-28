import { call, delay, put, takeLatest } from "redux-saga/effects";
import { USER_SIGNIN_SAGA } from "redux/constants/JiraCloneConst";
import { hideLoading, showLoading } from "redux/reducers/LoadingReducer";
import { userSignin } from "redux/reducers/UserReducer";
import { userService } from "services/UserService";
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
        console.log(err);
    }

    yield put(hideLoading());
}

export function* watchSigninSaga() {
    yield takeLatest(USER_SIGNIN_SAGA, signinSaga);
}