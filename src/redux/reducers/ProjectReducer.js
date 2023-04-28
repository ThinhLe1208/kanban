import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projectList: [],
    editProject: {
        "id": 0,
        "projectName": "",
        "creator": 0,
        "description": "<p>hello</p>",
        "categoryId": 2
    }
};

const ProjectReducer = createSlice({
    name: 'ProjectReducer',
    initialState,
    reducers: {
        getProjectList: (state, { payload }) => {
            state.projectList = payload;
        },
        setEditProject: (state, { payload }) => {
            state.editProject = payload;
        }
    }
});

export const {
    getProjectList,
    setEditProject
} = ProjectReducer.actions;

export default ProjectReducer.reducer;