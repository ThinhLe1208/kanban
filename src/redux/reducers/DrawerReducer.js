import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    title: 'Default',
    drawerContent: <p>Empty</p>,
    handleSubmitDrawer: () => {
        console.warning('Default handleSubmitDrawer');
    }
};

const drawerReducer = createSlice({
    name: 'drawerReducer',
    initialState,
    reducers: {
        showDrawer: (state) => {
            state.isOpen = true;
        },
        hideDrawer: (state) => {
            state.isOpen = false;
        },
        setDrawer: (state, { payload }) => {
            state.title = payload.title;
            state.drawerContent = payload.drawerContent;
            state.isOpen = true;
        },
        setHandleSubmitDrawer: (state, { payload }) => {
            state.handleSubmitDrawer = payload;
        }
    }
});

export const {
    showDrawer,
    hideDrawer,
    setDrawer,
    setHandleSubmitDrawer
} = drawerReducer.actions;

export default drawerReducer.reducer;