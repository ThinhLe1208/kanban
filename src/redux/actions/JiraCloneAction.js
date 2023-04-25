import { CURRENT_USER_API } from "../constants/JiraCloneConst";

export const signinAction = (email, passWord) => {
    return {
        type: CURRENT_USER_API,
        userSignin: {
            email,
            passWord
        }
    };
};