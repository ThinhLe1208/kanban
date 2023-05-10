import BaseService from "./BaseService";

class CommentService extends BaseService {
    getAllCommentService = taskId => this.get(`Comment/getAll?taskId=${taskId}`);

    insertCommentService = data => this.post('Comment/insertComment', data);

    updateCommentService = (commentId, contentComment) => this.put(`Comment/updateComment?id=${commentId}&contentComment=${contentComment}`);

    deleteCommentService = commentId => this.delete(`Comment/deleteComment?idComment=${commentId}`);
}

export const commentService = new CommentService();