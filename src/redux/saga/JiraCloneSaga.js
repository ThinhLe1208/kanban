import { call, delay, put, takeLatest } from "redux-saga/effects";
import { CURRENT_USER_API } from "../constants/JiraCloneConst";
import { jiraCloneService } from "../../services/JiraCloneService";
import { STATUS_CODE, TOKEN, CURRENT_USER } from "../../util/constants/settingSystem";
import { hideLoading, showLoading } from "../reducers/LoadingReducer";
import { history } from '../../util/history';
import { userLogin } from "../reducers/UserReducer";

function* signinApiAction(action) {
    yield put(showLoading());
    yield delay(500);

    try {
        const { data, status } = yield call(() => jiraCloneService.signinApi(action.userSignin));
        if (status === STATUS_CODE.SUCCESS) {
            localStorage.setItem(TOKEN, data.content.accessToken);
            localStorage.setItem(CURRENT_USER, JSON.stringify(data.content));
            yield put(userLogin(data.content));
            yield history.push("/home");
        }
    } catch (err) {
        console.log(err);
    }

    yield put(hideLoading());
}

export function* theoDoiSigninApiAction() {
    yield takeLatest(CURRENT_USER_API, signinApiAction);
}