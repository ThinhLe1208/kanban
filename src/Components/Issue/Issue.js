import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './Issue.module.scss';
import { getTaskDetailSagaAction } from 'redux/saga/actions/taskAction';
import { Avatar, Badge, Tag, Tooltip } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';

const cx = classNames.bind(styles);

export default function Issue({ issue, index }) {
    const { taskName, priorityTask, assigness, taskId } = issue;
    const dispatch = useDispatch();

    const renderAssigness = () => assigness.map((assignee, index) => (
        <Tooltip key={index} title={assignee.name} placement="top">
            <Avatar className={cx("avatar")} src={assignee.avatar} />
        </Tooltip>
    ));

    const handleClickIssue = () => {
        dispatch(getTaskDetailSagaAction(taskId));
    };

    const priority = () => {
        switch (priorityTask.priorityId) {
            case 1: return 'red';
            case 2: return 'orange';
            case 3: return 'green';
            case 4: return '';
            default:
        }
    };

    return (
        <Draggable
            // props of beautiful-dnd
            key={taskId}
            draggableId={taskId.toString()}
            index={index}
        >
            {(provided) => {
                return (
                    <li
                        className={cx("wrapper")}
                        onClick={handleClickIssue}

                        data-toggle="modal"
                        data-target="#infoModal"

                        // props of beautiful-dnd
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Badge.Ribbon className={cx("tag")} text={priorityTask.priority} color={priority()}>
                            <div className={cx("issue")}>
                                <Tag className={cx("type")} color={issue.taskTypeDetail?.id === 1 ? 'red' : 'geekblue'}>
                                    {issue.taskTypeDetail?.taskType}
                                </Tag>

                                <p className={cx("name")}>
                                    <span>Issue:</span>
                                    {taskName}
                                </p>

                                <div className={cx("content")}>
                                    <p className={cx("time")}>
                                        <ClockCircleOutlined />
                                        <span>{Math.floor(Math.random() * 24 + 1)}</span>
                                        <span>h ago</span>
                                    </p>

                                    <Avatar.Group className={cx("assigneeGroup")} maxCount={3}>
                                        {renderAssigness()}
                                    </Avatar.Group>
                                </div>
                            </div>
                        </Badge.Ribbon >
                    </li>
                );
            }}
        </Draggable>
    );
}
