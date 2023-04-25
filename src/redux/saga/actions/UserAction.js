import { USER_SIGNIN_API } from "../../constants/JiraCloneConst";

export const signinAction = (email, passWord) => {
    return {
        type: USER_SIGNIN_API,
        userSignin: {
            email,
            passWord
        }
    };
};