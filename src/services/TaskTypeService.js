import BaseService from './BaseService';

class TaskTypeService extends BaseService {
    getAllTaskType = () => this.get('TaskType/getAll');
}

export const taskTypeService = new TaskTypeService();