import BaseService from './BaseService';

class ProjectService extends BaseService {
    createProject = newProject => this.post('Project/createProject', newProject);

    createProjectAuthorization = newProject => this.post('Project/createProjectAuthorize', newProject);

    getAllProject = () => this.get('Project/getAllProject');

    getProjectDetail = projectId => this.get(`Project/getProjectDetail?id=${projectId}`);

    updateProject = updatedProject => this.put(`Project/updateProject?projectId=${updatedProject.id}`, updatedProject);

    deleteProject = id => this.delete(`Project/deleteProject?projectId=${id}`);

    assignUserProject = projectAssign => this.post('Project/assignUserProject', projectAssign);

    removeUserProject = projectAssign => this.post('Project/removeUserFromProject', projectAssign);
}

export const projectService = new ProjectService();