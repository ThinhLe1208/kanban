import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projectList: [],
    projectEdit: {
        "id": 0,
        "projectName": "default",
        "creator": 0,
        "description": "<p>default</p>",
        "categoryId": 1
    },
    projectDetail: []

};

const ProjectReducer = createSlice({
    name: 'ProjectReducer',
    initialState,
    reducers: {
        getProjectList: (state, { payload }) => {
            state.projectList = payload;
        },
        setProjectEdit: (state, { payload }) => {
            state.projectEdit = payload;
        },
        setProjectDetail: (state, { payload }) => {
            state.projectDetail = payload;
        }
    }
});

export const {
    getProjectList,
    setProjectEdit,
    setProjectDetail
} = ProjectReducer.actions;

export default ProjectReducer.reducer;