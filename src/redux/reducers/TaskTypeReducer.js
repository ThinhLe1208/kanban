import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    taskTypeList: []
};

const TaskTypeReducer = createSlice({
    name: 'TaskTypeReducer',
    initialState,
    reducers: {
        setAllTaskType: (state, { payload }) => {
            state.taskTypeList = payload;
        }
    }
});

export const { setAllTaskType } = TaskTypeReducer.actions;

export default TaskTypeReducer.reducer;