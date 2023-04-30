import BaseService from './BaseService';

class StatusService extends BaseService {
    getAllStatus = () => this.get('Status/getAll');
}

export const statusService = new StatusService();