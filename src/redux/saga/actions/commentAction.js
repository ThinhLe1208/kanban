import { DELETE_COMMENT_SAGA, GET_ALL_COMMENT_SAGA, INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from "redux/constants/JiraCloneConst";

export const getAllCommentSagaAction = taskId => ({
    type: GET_ALL_COMMENT_SAGA,
    taskId
});

export const insertCommentSagaAction = (taskId, contentComment) => ({
    type: INSERT_COMMENT_SAGA,
    data: {
        taskId,
        contentComment
    }
});

export const updateCommentSagaAction = (commentId, contentComment) => ({
    type: UPDATE_COMMENT_SAGA,
    commentId,
    contentComment
});

export const deleteCommentSagaAction = (commentId, taskId) => ({
    type: DELETE_COMMENT_SAGA,
    commentId,
    taskId
});