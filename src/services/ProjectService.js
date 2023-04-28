import BaseService from './BaseService';

class ProjectService extends BaseService {
    createProject = (newProject) => {
        return this.post('Project/createProject', newProject);
    };

    createProjectAuthorization = (newProject) => {
        return this.post('Project/createProjectAuthorize', newProject);
    };

    getAllProject = () => {
        return this.get('Project/getAllProject');
    };

    updateProject = (updatedProject) => {
        return this.put(`Project/updateProject?projectId=${updatedProject.id}`, updatedProject);
    };

    deleteProject = (id) => {
        return this.delete(`Project/deleteProject?projectId=${id}`);
    };
}

export const projectService = new ProjectService();