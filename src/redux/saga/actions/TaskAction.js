import { CREATE_TASK_SAGA } from "redux/constants/JiraCloneConst";

export const createTaskSaga = (newTask) => ({
    type: CREATE_TASK_SAGA,
    newTask
});
