import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { Avatar, Button, Col, Divider, Input, InputNumber, Row, Select, Slider, Space } from 'antd';
import { SendOutlined, LinkOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';

import { getAllTaskTypeSagaAction } from 'redux/saga/actions/taskTypeAction';
import { getAllPrioritySagaAction } from 'redux/saga/actions/priorityAction';
import { getAllStatusSagaAction } from 'redux/saga/actions/statusAction';
import { Editor } from '@tinymce/tinymce-react';
import { updateOriginalEstimateSagaAction, updatePrioritySagaAction, updateStatusSagaAction, updateTaskDescriptionSagaAction, updateTaskSagaAction } from 'redux/saga/actions/taskAction';

export default function InfoModal() {
    const dispatch = useDispatch();

    // const { projectDetail } = useSelector(state => state.projectReducer);
    const { taskDetail } = useSelector(state => state.taskReducer);
    const { statusList } = useSelector(state => state.statusReducer);
    const { priorityList } = useSelector(state => state.priorityReducer);
    const { taskTypeList } = useSelector(state => state.taskTypeReducer);

    const [isEditing, setIsEditing] = useState(false);
    const [contentEditor, setContentEditor] = useState(taskDetail.description);

    const handleChangeField = (value, name) => {
        const updatedTask = {
            ...taskDetail,
            [name]: value
        };
        dispatch(updateTaskSagaAction(updatedTask));
    };

    const renderDescription = () => {
        const jsxDescription = taskDetail.description && parse(taskDetail.description);

        return (
            <>
                {isEditing ? (
                    <div>
                        <Editor
                            name='description'

                            apiKey='64iv1bamj3ly5fr482iq34ud6xb2ebvhmf30hyzbx11eauzq'
                            initialValue={taskDetail.description}
                            value={contentEditor}
                            onEditorChange={(v) => setContentEditor(v)}
                            init={{
                                height: 200,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => {
                                    dispatch(updateTaskDescriptionSagaAction(taskDetail.taskId, contentEditor, taskDetail.projectId));
                                    setIsEditing(false);
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                type="text"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </Space>
                    </div>
                ) : (
                    <div onClick={() => setIsEditing(true)}>
                        {jsxDescription}
                    </div>
                )}
            </>
        );
    };

    const renderAssignees = () => {
        return taskDetail.assigness?.map((a, i) => (
            <div key={i} className="item" style={{ display: 'flex' }}>
                <div className="avatar">
                    <img src={a.avatar} alt='avatar' />
                </div>
                <p className="name">
                    {a.name}
                    <i className="fa fa-times" style={{ marginLeft: 5 }} />
                </p>
            </div>

        ));
    };

    useEffect(() => {
        // call api to get all task types
        dispatch(getAllTaskTypeSagaAction());
        // call api to get all priorities
        dispatch(getAllPrioritySagaAction());
        // call api to get all statuses
        dispatch(getAllStatusSagaAction());
        // call api to get all types
        dispatch(getAllTaskTypeSagaAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    {/* header */}
                    <Row>
                        {/* left header */}
                        <Col span={12}>
                            <label htmlFor="typeId"><h6 >TYPE</h6></label>
                            <Select
                                name="typeId"
                                id="typeId"
                                value={taskDetail.typeId}
                                onChange={(value) => handleChangeField(value, 'typeId')}
                                style={{ width: '100%' }}
                            >
                                {taskTypeList?.map(s => <Select.Option key={s.id} value={s.id}>{s.taskType}</Select.Option>)}
                            </Select>
                        </Col>
                        {/* right header */}
                        <Col span={12} align='right'>
                            <Space >
                                <Button type="text" icon={<SendOutlined />}>Give feedback</Button>
                                <Button type="text" icon={< LinkOutlined />}>Copy link</Button >
                                <Button type="text" icon={<DeleteOutlined />} />
                                <Button type="text" icon={<CloseOutlined />} />
                            </Space>
                        </Col>
                    </Row>

                    <Divider />

                    {/* body */}
                    <Row gutter={24}>
                        {/* Leftside */}
                        <Col span={14}>
                            {/* content */}
                            <h1>{taskDetail.taskName}</h1>

                            <p>Desciption</p>
                            {renderDescription()}

                            <Divider />

                            {/* comment */}
                            <p>Comments</p>

                            <Row>
                                <Col span={2}>
                                    <Avatar />
                                </Col>
                                <Col span={22}>
                                    <Input
                                        name="comment"
                                        placeholder='Add a comment...'
                                        style={{ width: '90%' }}
                                    />
                                </Col>
                            </Row>
                            {/* comment list */}
                            <Row>
                                <Col span={2}>
                                    <Avatar />
                                </Col>
                                <Col span={22}>
                                    Comment 1
                                </Col>
                            </Row>
                            <Row>
                                <Col span={2}>
                                    <Avatar />
                                </Col>
                                <Col span={22}>
                                    Comment 2
                                </Col>
                            </Row>
                        </Col>

                        {/* Rightside */}
                        <Col span={10}>
                            <label htmlFor="statusId"><h6 >STATUS</h6></label>
                            <Select
                                name="statusId"
                                id="statusId"
                                value={taskDetail.statusId}
                                onChange={(value) => dispatch(updateStatusSagaAction(taskDetail.taskId, value, taskDetail.projectId))}
                                style={{ width: '100%' }}
                            >
                                {statusList?.map((s, i) => <Select.Option key={i} value={s.statusId}>{s.statusName}</Select.Option>)}
                            </Select>

                            <label htmlFor="listUserAsign"><h6 >ASSIGNEES</h6></label>
                            <div style={{ display: 'flex' }}>
                                {renderAssignees()}
                                {taskDetail.assigness?.length ? (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <i className="fa fa-plus" style={{ marginRight: 5 }} /><span>Add more</span>
                                    </div>
                                ) : (
                                    <p>Unassigned</p>
                                )}
                            </div>

                            <label htmlFor="priorityId"><h6 >PRIORITY</h6></label>
                            <Select
                                name="priorityId"
                                id="priorityId"
                                value={taskDetail.priorityTask?.priorityId}
                                onChange={(value) => dispatch(updatePrioritySagaAction(taskDetail.taskId, value, taskDetail.projectId))}
                                style={{ width: '100%' }}
                            >
                                {priorityList?.map((s, i) => <Select.Option key={i} value={s.priorityId}>{s.priority}</Select.Option>)}
                            </Select>

                            <label htmlFor="originalEstimate"><h6 >ORIGINAL ESTIMATE (HOURS)</h6></label>
                            <InputNumber
                                name='originalEstimate'
                                value={taskDetail.originalEstimate}
                                min={0}
                                placeholder='Number'
                                onChange={(value) => dispatch(updateOriginalEstimateSagaAction(taskDetail.taskId, value, taskDetail.projectId))}
                            />

                            <label htmlFor="timeTracking"><h6 >TIME TRACKING</h6></label>
                            <Slider
                                name='timeTracking'
                                value={taskDetail.timeTrackingSpent}
                                disabled
                                min={0}
                                max={taskDetail.timeTrackingSpent + taskDetail.timeTrackingRemaining}
                            />

                            <Row>
                                <Col span={12}>
                                    <p>{taskDetail.timeTrackingSpent !== 0 ? `${taskDetail.timeTrackingSpent}h logged` : 'No time logged'}</p>
                                </Col>
                                <Col span={12}>
                                    <p style={{ textAlign: 'right' }}>{taskDetail.timeTrackingRemaining ? `${taskDetail.timeTrackingRemaining}h remaining` : `${taskDetail.timeTrackingSpent + taskDetail.timeTrackingRemaining}h estimated`}</p>
                                </Col>
                            </Row>

                            <Divider />

                            {/* time */}
                            <div style={{ color: '#929398' }}>Create at a month ago</div>
                            <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                        </Col>

                    </Row>
                </div>
            </div>
        </div >

    );
}
