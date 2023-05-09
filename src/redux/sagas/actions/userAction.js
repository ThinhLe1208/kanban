import { GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SAGA, USER_SIGNIN_SAGA } from "redux/constants/JiraCloneConst";

export const signinSagaAction = (email, passWord, isRemember) => ({
    type: USER_SIGNIN_SAGA,
    userSignin: {
        email,
        passWord
    },
    isRemember
});

export const getUserSagaAction = (keyword) => ({
    type: GET_USER_SAGA,
    keyword
});

export const getUserByProjectIdSagaAction = (projectId) => ({
    type: GET_USER_BY_PROJECT_ID_SAGA,
    projectId
});