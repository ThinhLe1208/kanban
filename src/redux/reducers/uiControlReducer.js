import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isCollapsed: true
};

const uiControlReducer = createSlice({
    name: 'uiControlReducer',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isLoading = true;
        },
        hideLoading: (state) => {
            state.isLoading = false;
        },
        setSidebar: (state) => {
            state.isCollapsed = !state.isCollapsed;
        },
    }
});

export const {
    showLoading,
    hideLoading,
    setSidebar,
} = uiControlReducer.actions;

export default uiControlReducer.reducer;