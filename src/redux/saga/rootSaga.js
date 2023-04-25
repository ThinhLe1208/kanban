import { all } from 'redux-saga/effects';
import * as UserSaga from './UserSaga';
import * as ProjectCategorySaga from './ProjectCategorySaga';

export function* rootSaga() {
    yield all([
        UserSaga.watchSigninApiAction(),
        ProjectCategorySaga.watchgetProjectCategoryAction()
    ]);
}