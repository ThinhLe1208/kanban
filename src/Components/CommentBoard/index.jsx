import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, Col, Input, Row, Space } from 'antd';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import { getAllCommentSagaAction, insertCommentSagaAction } from 'redux/saga/actions/commentAction';
import Card from 'components/Card';
import Comment from 'components/Comment';

const cx = classNames.bind(styles);

export default function CommentBoard({ taskDetail }) {
  const { taskId } = taskDetail;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userReducer);
  const { commentList } = useSelector((state) => state.commentReducer);
  const [isComment, setIsComment] = useState(false);
  const [contentComment, setContentComment] = useState('');

  const handleSendComment = () => {
    if (contentComment.trim().length !== 0) {
      dispatch(insertCommentSagaAction(taskId, contentComment));
      setIsComment(false);
      setContentComment('');
    }
  };

  const renderCommentMessages = (commentList) => {
    if (Array.isArray(commentList)) {
      return commentList.map((comment, index) => <Comment key={index} comment={comment} />);
    }
  };

  useEffect(() => {
    console.log('useEffect');
    dispatch(getAllCommentSagaAction(taskId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className={cx('wrapper')}>
      <p className={cx('label')}>Comments</p>

      <Row style={{ marginBottom: '20px' }}>
        <Col span={2}>
          <Avatar src={currentUser.avatar} />
        </Col>
        <Col span={22}>
          <Input
            value={contentComment}
            placeholder='Add a comment...'
            onClick={() => setIsComment(true)}
            onInput={(e) => setContentComment(e.target.value)}
          />
          {isComment && (
            <Space className={cx('commentBtns')}>
              <Button type='primary' size='small' onClick={handleSendComment}>
                Send
              </Button>
              <Button
                type='text'
                size='small'
                onClick={() => {
                  setIsComment(false);
                  setContentComment('');
                }}
              >
                Cancel
              </Button>
            </Space>
          )}
        </Col>
      </Row>
      {/* comment list */}
      {renderCommentMessages(commentList)}
    </Card>
  );
}
