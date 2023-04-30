import BaseService from 'services/BaseService';

class TaskService extends BaseService {
    createTask = newTask => this.post('Project/createTask', newTask);
}

export const taskService = new TaskService();