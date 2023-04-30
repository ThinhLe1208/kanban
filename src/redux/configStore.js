import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga/rootSaga';

import LoadingReducer from './reducers/LoadingReducer';
import UserReducer from './reducers/UserReducer';
import ProjectCategoryReducer from './reducers/ProjectCategoryReducer';
import ProjectReducer from './reducers/ProjectReducer';
import DrawerReducer from './reducers/DrawerReducer';
import TaskTypeReducer from './reducers/TaskTypeReducer';
import PriorityReducer from './reducers/PriorityReducer';
import StatusReducer from './reducers/StatusReducer';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
export const store = configureStore({
    reducer: {
        LoadingReducer,
        UserReducer,
        ProjectCategoryReducer,
        ProjectReducer,
        DrawerReducer,
        TaskTypeReducer,
        PriorityReducer,
        StatusReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // hide an error when states are components or functions in redux-toolkit store
        serializableCheck: false // works in the app, but doesn't in tests
    }).concat(sagaMiddleware),
});

// then run the saga
sagaMiddleware.run(rootSaga);