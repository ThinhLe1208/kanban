import { all } from 'redux-saga/effects';
import * as UserSaga from './UserSaga';
import * as ProjectCategorySaga from './ProjectCategorySaga';
import * as ProjectSaga from './ProjectSaga';

export function* rootSaga() {
    yield all([
        UserSaga.watchSigninSaga(),
        ProjectCategorySaga.watchGetProjectCategorySaga(),
        ProjectSaga.watchCreateProjectSaga(),
        ProjectSaga.watchGetAllProjectSaga(),
        ProjectSaga.watchUpdateProjectSaga(),
        ProjectSaga.watchDeleteProjectSaga(),
    ]);
}