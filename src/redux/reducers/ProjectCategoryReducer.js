import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projectCategoryArr: []
};

const projectCategoryReducer = createSlice({
    name: 'projectCategoryReducer',
    initialState,
    reducers: {
        setProjectCategoryArr: (state, { payload }) => {
            state.projectCategoryArr = payload;
        }
    }
});

export const { setProjectCategoryArr } = projectCategoryReducer.actions;

export default projectCategoryReducer.reducer;