import { CREATE_TASK_SAGA, GET_TASK_DETAIL_SAGA, UPDATE_ORIGINAL_ESTIMATE_SAGA, UPDATE_PRIORITY_SAGA, UPDATE_STATUS_SAGA, UPDATE_TASK_DESCRIPTION_SAGA, UPDATE_TASK_SAGA, UPDATE_TIME_TRACKING_SAGA } from "redux/constants/JiraCloneConst";

export const createTaskSagaAction = newTask => ({
    type: CREATE_TASK_SAGA,
    newTask
});

export const getTaskDetailSagaAction = taskId => ({
    type: GET_TASK_DETAIL_SAGA,
    taskId
});

export const updateTaskSagaAction = updatedTask => ({
    type: UPDATE_TASK_SAGA,
    updatedTask
});

export const updateTaskDescriptionSagaAction = (taskId, description, projectId) => ({
    type: UPDATE_TASK_DESCRIPTION_SAGA,
    data: {
        taskId,
        description
    },
    projectId
});

export const updateStatusSagaAction = (taskId, statusId, projectId) => ({
    type: UPDATE_STATUS_SAGA,
    data: {
        taskId,
        statusId
    },
    projectId
});

export const updatePrioritySagaAction = (taskId, priorityId, projectId) => ({
    type: UPDATE_PRIORITY_SAGA,
    data: {
        taskId,
        priorityId
    },
    projectId
});

export const updateTimeTrackingSagaAction = updatedTimeTracking => ({
    type: UPDATE_TIME_TRACKING_SAGA,
    updatedTimeTracking
});

export const updateOriginalEstimateSagaAction = (taskId, originalEstimate, projectId) => ({
    type: UPDATE_ORIGINAL_ESTIMATE_SAGA,
    data: {
        taskId,
        originalEstimate
    },
    projectId
});
