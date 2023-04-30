import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    title: 'Default',
    drawerContent: <p>Empty</p>,
    handleSubmitDrawer: () => {
        console.warning('Default handleSubmitDrawer');
    }
};

const DrawerReducer = createSlice({
    name: 'DrawerReducer',
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
} = DrawerReducer.actions;

export default DrawerReducer.reducer;