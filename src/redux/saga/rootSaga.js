import { all } from 'redux-saga/effects';
import * as UserSaga from './UserSaga';
import * as ProjectCategorySaga from './ProjectCategorySaga';
import * as TaskTypeSaga from './TaskTypeSaga';
import * as PrioritySaga from './PrioritySaga';
import * as ProjectSaga from './ProjectSaga';
import * as StatusSaga from './StatusSaga';
import * as TaskSaga from './TaskSaga';

export function* rootSaga() {
    yield all([
        UserSaga.watchSigninSaga(),
        UserSaga.watchGetUserSaga(),
        UserSaga.watchGetUserByProjectIdSaga(),

        ProjectCategorySaga.watchGetProjectCategorySaga(),
        TaskTypeSaga.watchGetAllTaskType(),
        PrioritySaga.watchGetAllPrioritySaga(),
        StatusSaga.watchGetAllStatusSaga(),

        ProjectSaga.watchCreateProjectSaga(),
        ProjectSaga.watchGetAllProjectSaga(),
        ProjectSaga.watchGetProjectDetailSaga(),
        ProjectSaga.watchUpdateProjectSaga(),
        ProjectSaga.watchDeleteProjectSaga(),
        ProjectSaga.watchAssignUserProjectSaga(),
        ProjectSaga.watchRemoveUserProjectSaga(),

        TaskSaga.watchCreateTaskSaga(),
    ]);
}