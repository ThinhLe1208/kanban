import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    taskDetail: {
        "priorityTask": {
            "priorityId": 3,
            "priority": "Low"
        },
        "taskTypeDetail": {
            "id": 1,
            "taskType": "bug"
        },
        "assigness": [
            {
                "id": 4415,
                "avatar": "https://ui-avatars.com/api/?name=dev đẹp chai lái mái bai",
                "name": "dev đẹp chai lái mái bai",
                "alias": "dev-dep-chai-lai-mai-bai"
            },
            {
                "id": 4190,
                "avatar": "https://ui-avatars.com/api/?name=nguyen",
                "name": "nguyen",
                "alias": "david"
            }
        ],
        "lstComment": [],
        "taskId": 9791,
        "taskName": "lam du thu",
        "alias": "lam-du-thu",
        "description": "<p>ddd</p>\n<div class=\"ddict_btn\" style=\"top: 28px; left: 39.3594px;\"><img src=\"chrome-extension://bpggmmljdiliancllaapiggllnkbjocb/logo/48.png\"></div>",
        "statusId": "1",
        "originalEstimate": 5,
        "timeTrackingSpent": 2,
        "timeTrackingRemaining": 3,
        "typeId": 1,
        "priorityId": 3,
        "projectId": 12445
    }
};

const taskReducer = createSlice({
    name: 'taskReducer',
    initialState,
    reducers: {
        setTaskDetail: (state, { payload }) => {
            state.taskDetail = payload;
        },
        setDescription: (state, { payload }) => {
            state.taskDetail.description = payload;
        }
    }
});

export const {
    setTaskDetail,
    setDescription,
} = taskReducer.actions;

export default taskReducer.reducer;