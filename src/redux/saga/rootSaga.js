import { all } from 'redux-saga/effects';
import * as userSaga from './userSaga';
import * as projectCategorySaga from './projectCategorySaga';
import * as taskTypeSaga from './taskTypeSaga';
import * as prioritySaga from './prioritySaga';
import * as projectSaga from './projectSaga';
import * as statusSaga from './statusSaga';
import * as taskSaga from './taskSaga';

export function* rootSaga() {
    yield all([
        userSaga.watchSigninSaga(),
        userSaga.watchGetUserSaga(),
        userSaga.watchGetUserByProjectIdSaga(),

        projectCategorySaga.watchGetProjectCategorySaga(),
        taskTypeSaga.watchGetAllTaskType(),
        prioritySaga.watchGetAllPrioritySaga(),
        statusSaga.watchGetAllStatusSaga(),

        projectSaga.watchCreateProjectSaga(),
        projectSaga.watchGetAllProjectSaga(),
        projectSaga.watchGetProjectDetailSaga(),
        projectSaga.watchUpdateProjectSaga(),
        projectSaga.watchDeleteProjectSaga(),
        projectSaga.watchAssignUserProjectSaga(),
        projectSaga.watchRemoveUserProjectSaga(),

        taskSaga.watchCreateTaskSaga(),
    ]);
}