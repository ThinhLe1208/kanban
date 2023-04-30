import { call, put, takeLatest } from "redux-saga/effects";
import { GET_PROJECT_CATEGORY_SAGA } from "redux/constants/JiraCloneConst";
import { setProjectCategoryArr } from "redux/reducers/ProjectCategoryReducer";
import { projectCategoryService } from "services/ProjectCategoryService";
import { STATUS_CODE } from "util/constants/settingSystem";

function* getProjectCategorySaga() {
    try {
        const { data, status } = yield call(projectCategoryService.getProjectCategory);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(setProjectCategoryArr(data.content));
        }
    } catch (err) {
        console.error(err);
    }
}

export function* watchGetProjectCategorySaga() {
    yield takeLatest(GET_PROJECT_CATEGORY_SAGA, getProjectCategorySaga);
}