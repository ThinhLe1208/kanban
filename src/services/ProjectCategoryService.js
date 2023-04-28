import Axios from 'axios';
import { DOMAIN } from 'util/constants/settingSystem';

class ProjectCategoryService {
    getProjectCategory = () => {
        return Axios({
            url: `${DOMAIN}/ProjectCategory`,
            method: 'GET'
        });
    };
}

export const projectCategoryService = new ProjectCategoryService();