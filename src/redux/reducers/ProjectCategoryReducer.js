import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projectCategoryArr: []
};

const ProjectCategoryReducer = createSlice({
    name: 'ProjectCategoryReducer',
    initialState,
    reducers: {
        setProjectCategoryArr: (state, { payload }) => {
            state.projectCategoryArr = payload;
        }
    }
});

export const { setProjectCategoryArr } = ProjectCategoryReducer.actions;

export default ProjectCategoryReducer.reducer;