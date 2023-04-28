import { GET_PROJECT_CATEGORY_SAGA } from "redux/constants/JiraCloneConst";

export const getProjectCategorySagaAction = () => {
    return {
        type: GET_PROJECT_CATEGORY_SAGA
    };
};