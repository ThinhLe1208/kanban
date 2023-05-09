import { ASSIGN_USER_PROJECT_SAGA, CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_ALL_PROJECT_SAGA, GET_PROJECT_DETAIL_SAGA, REMOVE_USER_PROJECT_SAGA, UPDATE_PROJECT_SAGA } from "redux/constants/JiraCloneConst";

export const createProjectSagaAction = (newProject) => ({
    type: CREATE_PROJECT_SAGA,
    newProject
});

export const getAllProjectSagaAction = () => ({
    type: GET_ALL_PROJECT_SAGA,
});

export const getProjectDetailSagaAction = (projectId) => ({
    type: GET_PROJECT_DETAIL_SAGA,
    projectId
});


export const updateProjectSagaAction = (updatedProject) => ({
    type: UPDATE_PROJECT_SAGA,
    updatedProject
});


export const deleteProjectSagaAction = (id) => ({
    type: DELETE_PROJECT_SAGA,
    id
});


export const assignUserProjectSagaAction = (projectId, userId) => ({
    type: ASSIGN_USER_PROJECT_SAGA,
    userProject: {
        projectId,
        userId
    }
});

export const removeUserProjectSagaAction = (projectId, userId) => ({
    type: REMOVE_USER_PROJECT_SAGA,
    userProject: {
        projectId,
        userId
    }
});
