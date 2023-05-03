import React from 'react';
import { useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import classNames from 'classnames/bind';

import styles from './Issue.module.scss';
import { getTaskDetailSagaAction } from 'redux/saga/actions/taskAction';
import { Avatar, Badge, Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

export default function Issue({ issue }) {
    const { taskName, priorityTask, assigness, taskId, description } = issue;
    const dispatch = useDispatch();

    const renderAssigness = () => assigness.map((assigne, index) => (
        <Avatar key={index} src={assigne.avatar} />
    ));

    const handleClickIssue = () => {
        dispatch(getTaskDetailSagaAction(taskId));
    };

    const priority = () => {
        switch (priorityTask.priorityId) {
            case 1: return 'error';
            case 2: return 'warning';
            case 3: return 'success';
            case 4: return 'processing';
            default:
        }
    };

    return (
        <Badge.Ribbon text={issue.taskTypeDetail?.taskType} color={issue.taskTypeDetail?.taskType === 'bug' ? 'red' : 'green'}>
            <div className={cx("wrapper")} onClick={handleClickIssue} data-toggle="modal" data-target="#infoModal">
                <Tag className={cx("priority")} color={priority()}>
                    {priorityTask.priority}
                </Tag>

                <p className={cx("name")}>
                    <span>Name:</span>
                    {taskName}
                </p>

                <div className={cx("desciption")}>
                    {parse(description)}
                </div>

                <div className={cx("content")}>
                    <p className={cx("time")}>
                        <ClockCircleOutlined />
                        <span>{Math.floor(Math.random() * 24 + 1)}</span>
                        <span>h ago</span>
                    </p>

                    <div className={cx("assigneeGroup")} >
                        {renderAssigness()}
                    </div>
                </div>
            </div>
        </Badge.Ribbon >
    );
}
