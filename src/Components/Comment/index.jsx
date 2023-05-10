import React, { useRef, useState } from 'react';
import { Avatar, Button, Col, Input, Row } from 'antd';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import Card from 'components/Card';
import { useDispatch } from 'react-redux';
import { deleteCommentSagaAction, updateCommentSagaAction } from 'redux/sagas/actions/commentAction';

const cx = classNames.bind(styles);

export default function Comment({ comment }) {
  const { user, contentComment, id, taskId } = comment;
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(contentComment);
  // random comment generation time
  const timeRef = useRef(Math.floor(Math.random() * 24 + 1));

  const handleUpdateComment = () => {
    dispatch(updateCommentSagaAction(id, updatedComment));
    setIsEdit(false);
  };

  const handleEditComment = () => {
    setIsEdit(true);
    setUpdatedComment(contentComment);
  };

  const handleDeleteComment = () => {
    dispatch(deleteCommentSagaAction(id, taskId));
  };

  return (
    <div className={cx('wrapper')}>
      <Row>
        <Col span={2} className={cx('leftSide')}>
          <Avatar src={user.avatar} />
        </Col>

        <Col span={22}>
          <div className={cx('rightSide')}>
            <p className={cx('useName')}>
              {user.name}
              <span className={cx('time')}>{timeRef.current} hours ago</span>
            </p>

            {isEdit ? (
              <>
                <div style={{ padding: '8px 0', width: '100%' }}>
                  <Input
                    value={updatedComment}
                    onInput={(e) => setUpdatedComment(e.target.value)}
                    styles={{ width: '100%' }}
                  />
                </div>
                <div className={cx('buttons')}>
                  <Button type='primary' size='small' onClick={handleUpdateComment}>
                    Save
                  </Button>
                  <Button type='text' size='small' onClick={() => setIsEdit(false)}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Card className={cx('contentMess')}>{contentComment}</Card>
                <div className={cx('buttons')}>
                  <Button type='text' size='small' onClick={handleEditComment}>
                    <u>Edit</u>
                  </Button>
                  <Button type='text' size='small' onClick={handleDeleteComment}>
                    <u>Delete</u>
                  </Button>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
