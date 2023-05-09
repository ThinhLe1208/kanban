import BaseService from './BaseService';

class UserService extends BaseService {
    getUser = keyword => this.get(`Users/getUser?keyword=${keyword}`);

    getUserByProjectId = projectId => this.get(`Users/getUserByProjectId?idProject=${projectId}`);

    signIn = userSignIn => this.post('Users/signin', userSignIn);

    signUp = userSignUp => this.post('Users/signup', userSignUp);
}

export const userService = new UserService();