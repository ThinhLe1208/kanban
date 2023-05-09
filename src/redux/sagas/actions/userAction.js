import { GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SAGA, USER_SIGNIN_SAGA, USER_SIGNUP_SAGA } from "redux/constants/JiraCloneConst";

export const getUserSagaAction = (keyword) => ({
    type: GET_USER_SAGA,
    keyword
});

export const getUserByProjectIdSagaAction = (projectId) => ({
    type: GET_USER_BY_PROJECT_ID_SAGA,
    projectId
});

export const signInSagaAction = (userSignIn, isRemember) => ({
    type: USER_SIGNIN_SAGA,
    userSignIn,
    isRemember
});

export const signUpSagaAction = userSignUp => ({
    type: USER_SIGNUP_SAGA,
    userSignUp
});

