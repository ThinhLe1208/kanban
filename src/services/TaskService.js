import BaseService from 'services/BaseService';

class TaskService extends BaseService {
    createTask = newTask => this.post('Project/createTask', newTask);

    getTaskDetail = taskId => this.get(`Project/getTaskDetail?taskId=${taskId}`);

    updateTask = updatedTask => this.post('Project/updateTask', updatedTask);

    updateTaskDescription = data => this.put('Project/updateDescription', data);

    updateStatus = data => this.put('Project/updateStatus', data);

    updatePriority = data => this.put('Project/updatePriority', data);

    updateOriginalEstimate = data => this.put('Project/updateEstimate', data);

    updateTimeTracking = data => this.put('Project/updateTimeTracking', data);
}

export const taskService = new TaskService();