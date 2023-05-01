import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    statusList: []
};

const statusReducer = createSlice({
    name: 'statusReducer',
    initialState,
    reducers: {
        setStatusList: (state, { payload }) => {
            state.statusList = payload;
        }
    }
});

export const {
    setStatusList
} = statusReducer.actions;

export default statusReducer.reducer;