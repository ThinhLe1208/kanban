import { call, takeLatest } from "redux-saga/effects";
import { projectCategoryService } from "../../services/ProjectCategoryService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { GET_PROJECT_CATEGORY_API } from "../constants/JiraCloneConst";

function* getProjectCategoryAction() {
    try {
        const { data, status } = yield call(projectCategoryService.getProjectCategory());
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data);
        }
    } catch (err) {
        console.log(err);
    }
}

export function* watchgetProjectCategoryAction() {
    yield takeLatest(GET_PROJECT_CATEGORY_API, getProjectCategoryAction);
}