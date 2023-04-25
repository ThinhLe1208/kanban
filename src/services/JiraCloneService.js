import Axios from 'axios';
import { DOMAIN } from '../util/constants/settingSystem';

class JiraCloneService {
    signinApi = (userSignin) => {
        return Axios({
            url: `${DOMAIN}/Users/signin`,
            method: 'POST',
            data: userSignin
        });
    };
}

export const jiraCloneService = new JiraCloneService();