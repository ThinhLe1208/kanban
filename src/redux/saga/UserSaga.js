import { call, delay, put, takeLatest } from "redux-saga/effects";
import { USER_SIGNIN_API } from "../constants/JiraCloneConst";
import { userService } from "../../services/UserService";
import { STATUS_CODE, TOKEN, CURRENT_USER } from "../../util/constants/settingSystem";
import { hideLoading, showLoading } from "../reducers/LoadingReducer";
import { history } from '../../util/history';
import { userSignin } from "../reducers/UserReducer";

function* signinApiAction(action) {
    yield put(showLoading());
    yield delay(500);

    try {
        const { data, status } = yield call(() => userService.signinApi(action.userSignin));
        if (status === STATUS_CODE.SUCCESS) {
            // save token and user info to localStorage
            localStorage.setItem(TOKEN, data.content.accessToken);
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

export function* watchSigninApiAction() {
    yield takeLatest(USER_SIGNIN_API, signinApiAction);
}