import Axios from 'axios';
import { DOMAIN } from 'util/constants/settingSystem';

class UserService {
    signin = (userSignin) => {
        return Axios({
            url: `${DOMAIN}/Users/signin`,
            method: 'POST',
            data: userSignin
        });
    };
    getProjectCategory = () => {
        return Axios({
            url: `${DOMAIN}/ProjectCategory`,
            method: 'GET'
        });
    };
}

export const userService = new UserService();