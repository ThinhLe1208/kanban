import { CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_ALL_PROJECT_SAGA, UPDATE_PROJECT_SAGA } from "redux/constants/JiraCloneConst";

export const createProjectSagaAction = (newProject) => {
    return {
        type: CREATE_PROJECT_SAGA,
        newProject
    };
};

export const getAllProjectSagaAction = () => {
    return {
        type: GET_ALL_PROJECT_SAGA,
    };
};

export const updateProjectSagaAction = (updatedProject) => {
    return {
        type: UPDATE_PROJECT_SAGA,
        updatedProject
    };
};

export const deleteProjectSagaAction = (id) => {
    return {
        type: DELETE_PROJECT_SAGA,
        id
    };
};