import BaseService from 'services/BaseService';

class PriorityService extends BaseService {
    getAllPriority = () => this.get('Priority/getAll');
}

export const priorityService = new PriorityService();