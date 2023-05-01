import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false
};

const loadingReducer = createSlice({
    name: 'loadingReducer',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isLoading = true;
        },
        hideLoading: (state) => {
            state.isLoading = false;
        }
    }
});

export const { showLoading, hideLoading } = loadingReducer.actions;

export default loadingReducer.reducer;