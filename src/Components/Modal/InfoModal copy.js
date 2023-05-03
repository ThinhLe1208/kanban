import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { Avatar, Col, Form, InputNumber, Row, Select, Slider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { getAllTaskTypeSagaAction } from 'redux/saga/actions/taskTypeAction';
import { getAllPrioritySagaAction } from 'redux/saga/actions/priorityAction';
import { getAllStatusSagaAction } from 'redux/saga/actions/statusAction';

export default function InfoModal() {
    const dispatch = useDispatch();

    const { taskDetail } = useSelector(state => state.taskReducer);
    const { taskTypeList } = useSelector(state => state.taskTypeReducer);
    const { statusList } = useSelector(state => state.statusReducer);
    const { priorityList } = useSelector(state => state.priorityReducer);
    console.log('taskDetail', taskDetail);
    console.log('taskTypeList', taskTypeList);

    useEffect(() => {
        // call api to get all task types
        dispatch(getAllTaskTypeSagaAction());
        // call api to get all priorities
        dispatch(getAllPrioritySagaAction());
        // call api to get all statuses
        dispatch(getAllStatusSagaAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="modal fade" id="infoModal2" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark" />
                            <span>{taskDetail.taskName}</span>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">x</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">This is an issue of type: Task.</p>
                                    <div className="description">
                                        <p>Description</p>
                                        <p>{parse(taskDetail.description)}</p>
                                    </div>

                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={require("../../assets/img/avatar(1).jfif")} alt="avatar" />
                                            </div>
                                            <div className="input-comment">
                                                <input type="text" placeholder="Add a comment ..." />
                                                <p>
                                                    <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                    <span>press
                                                        <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                        to comment</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="lastest-comment">
                                            <div className="comment-item">
                                                <div className="display-comment" style={{ display: 'flex' }}>
                                                    <div className="avatar">
                                                        <img src={require("../../assets/img/avatar(1).jfif")} alt="avatar" />
                                                    </div>
                                                    <div>
                                                        <p style={{ marginBottom: 5 }}>
                                                            Lord Gaben <span>a month ago</span>
                                                        </p>
                                                        <p style={{ marginBottom: 5 }}>
                                                            Lorem ipsum dolor sit amet, consectetur
                                                            adipisicing elit. Repellendus tempora ex
                                                            voluptatum saepe ab officiis alias totam ad
                                                            accusamus molestiae?
                                                        </p>
                                                        <div>
                                                            <span style={{ color: '#929398' }}>Edit</span>
                                                            •
                                                            <span style={{ color: '#929398' }}>Delete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className="status">
                                        <Form.Item label='Status' name='statusId' labelCol={{ span: '24' }}>
                                            <Select
                                                name="statusId"
                                                // value={values.statusId}
                                                placeholder='Select status'
                                                // onChange={(value) => customHandleChangeAntd(value, "statusId")}
                                                // onBlur={handleBlur}
                                                options={statusList.map(s => ({ label: s.statusName, value: s.statusId }))}
                                            // status={errors.statusId && touched.statusId ? "error" : ""}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div style={{ display: 'flex' }}>
                                            {taskDetail.assigness.map((a, i) => <Avatar src={a.avatar} />)}
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <i className="fa fa-plus" style={{ marginRight: 5 }} /><span>Add more</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <Form.Item label='Priority' name='priorityId' labelCol={{ span: '24' }}>
                                            <Select
                                                name="priorityId"
                                                // value={values.statusId}
                                                placeholder='Select status'
                                                // onChange={(value) => customHandleChangeAntd(value, "statusId")}
                                                // onBlur={handleBlur}
                                                options={priorityList.map(p => ({ label: p.priority, value: p.priorityId }))}
                                            // status={errors.statusId && touched.statusId ? "error" : ""}
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="estimate">
                                        <Form.Item label='ORIGINAL ESTIMATE (HOURS)' name='originalEstimate' >
                                            <InputNumber
                                                name='originalEstimate'
                                                value={taskDetail.originalEstimate}
                                                min={0}
                                                placeholder='Number'
                                                // onChange={(value) => customHandleChangeAntd(value, 'timeTrackingSpent')}
                                                style={{ width: '90%' }}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="time-tracking">
                                        <Form.Item label='TIME TRACKING' name='originalEstimate' labelCol={{ span: '24' }}>
                                            <Slider
                                                name='originalEstimate'
                                                value={taskDetail.timeTrackingSpent}
                                                disabled
                                                min={0}
                                                max={taskDetail.timeTrackingSpent + taskDetail.timeTrackingRemaining}
                                            // onChange={(value) => customHandleChangeAntd(value, 'timeTrackingSpent')}
                                            />
                                        </Form.Item>

                                        <Row>
                                            <Col span={12}>
                                                <p>{taskDetail.timeTrackingSpent !== 0 ? `${taskDetail.timeTrackingSpent}h logged` : 'No time logged'}</p>
                                            </Col>
                                            <Col span={12}>
                                                <p style={{ textAlign: 'right' }}>{taskDetail.timeTrackingRemaining ? `${taskDetail.timeTrackingRemaining}h remaining` : `${taskDetail.timeTrackingSpent + taskDetail.timeTrackingRemaining}h estimated`}</p>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
