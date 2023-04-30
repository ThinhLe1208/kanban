import { Editor } from '@tinymce/tinymce-react';
import { Col, InputNumber, Row, Select, Slider, Form, Input } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHandleSubmitDrawer } from 'redux/reducers/DrawerReducer';
import { getAllPrioritySagaAction } from 'redux/saga/actions/PriorityAction';
import { getAllStatusSagaAction } from 'redux/saga/actions/StatusAction';
import { createTaskSaga } from 'redux/saga/actions/TaskAction';
import { getAllTaskTypeSagaAction } from 'redux/saga/actions/TaskTypeAction';
import { getUserByProjectIdSagaAction } from 'redux/saga/actions/UserAction';
import * as Yup from 'yup';

const CreateTaskSchema = Yup.object().shape({
    taskName: Yup.string().required('Field is required'),
    projectId: Yup.number().required('Field is required'),
    priorityId: Yup.number().required('Field is required'),
    typeId: Yup.number().required('Field is required'),
    statusId: Yup.number().required('Field is required'),
});

export default function CreateTaskForm() {
    const dispatch = useDispatch();

    // connect to redux-toolkit store
    const { projectList } = useSelector(state => state.ProjectReducer);
    const { taskTypeList } = useSelector(state => state.TaskTypeReducer);
    const { priorityList } = useSelector(state => state.PriorityReducer);
    const { getUserByProjectId } = useSelector(state => state.UserReducer);
    const { statusList } = useSelector(state => state.StatusReducer);

    const customHandleChangeAntd = (value, name) => {
        const changeEvent = {
            target: {
                name,
                value
            }
        };
        handleChange(changeEvent);
    };

    // Formik
    const {
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue
    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            taskName: '',
            statusId: null,
            projectId: null,
            priorityId: null,
            typeId: null,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            listUserAsign: [],

        },
        validationSchema: CreateTaskSchema,
        onSubmit: (values) => {
            const updatedValues = {
                ...values,
                originalEstimate: values.timeTrackingSpent + values.timeTrackingRemaining
            };
            dispatch(createTaskSaga(updatedValues));
        },
    });

    useEffect(() => {
        // save the submit handler form to redux-toolkit store
        dispatch(setHandleSubmitDrawer(handleSubmit));
        // call api to get all task types
        dispatch(getAllTaskTypeSagaAction());
        // call api to get all priorities
        dispatch(getAllPrioritySagaAction());
        // call api to get all statuses
        dispatch(getAllStatusSagaAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item label='Project Name' name='projectId' rules={[{ required: errors.projectId && touched.projectId, message: errors.projectId }]}>
                    <Select
                        name="projectId"
                        value={values.projectId}
                        style={{ width: '100%' }}
                        placeholder="Select project"
                        optionFilterProp="label"
                        showSearch
                        onChange={(value) => customHandleChangeAntd(value, "projectId")}
                        onBlur={handleBlur}
                        onSelect={(value) => dispatch(getUserByProjectIdSagaAction(value))}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={projectList.map(p => ({ label: p.projectName, value: p.id }))}
                        status={errors.projectId && touched.projectId ? "error" : ""}
                    />
                </Form.Item>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label='Task Name' name='taskName' rules={[{ required: errors.taskName && touched.taskName, message: errors.taskName }]}>
                            <Input
                                name="taskName"
                                value={values.taskName}
                                style={{ width: '100%' }}
                                placeholder="Insert task name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                status={errors.taskName && touched.taskName ? "error" : ""}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='Status' name='statusId' rules={[{ required: errors.statusId && touched.statusId, message: errors.statusId }]}>
                            <Select
                                name="statusId"
                                value={values.statusId}
                                placeholder='Select status'
                                onChange={(value) => customHandleChangeAntd(value, "statusId")}
                                onBlur={handleBlur}
                                options={statusList.map(p => ({ label: p.statusName, value: p.statusId }))}
                                status={errors.statusId && touched.statusId ? "error" : ""}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label='Priority' name='priorityId' labelAlign='left' rules={[{ required: errors.priorityId && touched.priorityId, message: errors.priorityId }]}>
                            <Select
                                name="priorityId"
                                value={values.priorityId}
                                placeholder='Select priority'
                                onChange={(value) => customHandleChangeAntd(value, "priorityId")}
                                onBlur={handleBlur}
                                options={priorityList.map(p => ({ label: p.priority, value: p.priorityId }))}
                                status={errors.priorityId && touched.priorityId ? "error" : ""}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='Task type' name='typeId' labelAlign='left' rules={[{ required: errors.typeId && touched.typeId, message: errors.typeId }]}>
                            <Select
                                name="typeId"
                                value={values.typeId}
                                placeholder='Select task type'
                                onChange={(value) => customHandleChangeAntd(value, "typeId")}
                                onBlur={handleBlur}
                                options={taskTypeList.map(p => ({ label: p.taskType, value: p.id }))}
                                status={errors.typeId && touched.typeId ? "error" : ""}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <p>Desciption</p>
                <Editor
                    name='description'

                    apiKey='64iv1bamj3ly5fr482iq34ud6xb2ebvhmf30hyzbx11eauzq'
                    value={values.description}
                    onEditorChange={(value) => {
                        setFieldValue('description', value);
                    }}
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
                <br />

                <Form.Item label='Assign user' name='listUserAsign'  >
                    <Select
                        name='listUserAsign'
                        value={values.listUserAsign}
                        style={{ width: '100%' }}
                        placeholder="Select user"
                        optionFilterProp='label'
                        mode="multiple"
                        showSearch
                        allowClear
                        onChange={(value) => customHandleChangeAntd(value, 'listUserAsign')}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={getUserByProjectId.map(u => ({ label: u.name, value: u.userId }))}
                    />
                </Form.Item>

                <Form.Item label='Time Tracking' name='timeTrackingSpent'  >
                    <Slider
                        name='timeTrackingSpent'
                        value={values.timeTrackingSpent}
                        disabled
                        min={0}
                        max={values.timeTrackingSpent + values.timeTrackingRemaining}
                        onChange={(value) => customHandleChangeAntd(value, 'timeTrackingSpent')}
                    />
                </Form.Item>

                <Row>
                    <Col span={12}>
                        <p>{values.timeTrackingSpent !== 0 ? `${values.timeTrackingSpent}h logged` : 'No time logged'}</p>
                    </Col>
                    <Col span={12}>
                        <p style={{ textAlign: 'right' }}>{values.timeTrackingRemaining ? `${values.timeTrackingRemaining}h remaining` : `${values.timeTrackingSpent + values.timeTrackingRemaining}h estimated`}</p>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label='Time spent (hours)' name='timeTrackingSpent' >
                            <InputNumber
                                name='timeTrackingSpent'
                                value={values.timeTrackingSpent}
                                min={0}
                                placeholder='Number'
                                onChange={(value) => customHandleChangeAntd(value, 'timeTrackingSpent')}
                                style={{ width: '90%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='Time remaining (hours)' name='timeTrackingRemaining'>
                            <InputNumber
                                name='timeTrackingRemaining'
                                value={values.timeTrackingRemaining}
                                min={0}
                                placeholder='Number'
                                onChange={(value) => customHandleChangeAntd(value, 'timeTrackingRemaining')}
                                style={{ width: '90%' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </div >
    );
}
