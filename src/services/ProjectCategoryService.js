import BaseService from 'services/BaseService';

class ProjectCategoryService extends BaseService {
    getProjectCategory = () => this.get('ProjectCategory');
}

export const projectCategoryService = new ProjectCategoryService();