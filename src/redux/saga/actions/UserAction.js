import { USER_SIGNIN_SAGA } from "redux/constants/JiraCloneConst";

export const signinSagaAction = (email, passWord) => {
    return {
        type: USER_SIGNIN_SAGA,
        userSignin: {
            email,
            passWord
        }
    };
};