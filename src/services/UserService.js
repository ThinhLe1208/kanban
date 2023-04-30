import BaseService from './BaseService';

class UserService extends BaseService {
    signin = userSignin => this.post('Users/signin', userSignin);

    getUser = keyword => this.get(`Users/getUser?keyword=${keyword}`);

    getUserByProjectId = projectId => this.get(`Users/getUserByProjectId?idProject=${projectId}`);
}

export const userService = new UserService();