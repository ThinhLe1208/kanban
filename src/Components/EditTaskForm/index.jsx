import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { Button, Col, Divider, Popover, Row, Space } from 'antd';
import { SendOutlined, LinkOutlined, DeleteOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import {
  updateTaskDescriptionSagaAction,
  updateTaskSagaAction,
  updateTimeTrackingSagaAction,
} from 'redux/saga/actions/taskAction';
import EditorField from 'components/EditorField';
import SelectField from 'components/SelectField';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import InputField from 'components/InputField';
import SliderField from 'components/SliderField';
import CommentBoard from 'components/CommentBoard';
import Card from 'components/Card';

const cx = classNames.bind(styles);

const EditTaskSchema = Yup.object().shape({
  taskName: Yup.string().required('Please provide an issue name.'),
});

export default function EditTaskForm() {
  const dispatch = useDispatch(); // connect to redux-toolkit store

  const { projectDetail } = useSelector((state) => state.projectReducer);
  const { taskDetail } = useSelector((state) => state.taskReducer);
  const { statusList } = useSelector((state) => state.statusReducer);
  const { priorityList } = useSelector((state) => state.priorityReducer);
  console.log('taskDetail EditTaskForm', taskDetail);

  let [isEditingName, setIsEditingName] = useState(false);
  let [isEditingDes, setIsEditingDes] = useState(false);
  // history values in case user click cancel button, show old values; in case user click accept button, set new values
  let [contentName, setContentName] = useState(taskDetail.taskName);
  let [contentEditor, setContentEditor] = useState(taskDetail.description);
  let [openTracking, setOpenTracking] = useState(false);

  // Formik
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: {
      taskName: taskDetail?.taskName,
      statusId: taskDetail?.statusId,
      projectId: projectDetail?.id,
      priorityId: taskDetail?.priorityTask.priorityId,
      description: taskDetail?.description,
      originalEstimate: 7,
      timeTrackingSpent: 3,
      timeTrackingRemaining: 4,
      listUserAsign: taskDetail?.assigness.map((assig) => assig.name),
    },
    validationSchema: EditTaskSchema,
  });

  const items = [
    {
      label: (
        <Space>
          <FontAwesomeIcon icon={faSquareCheck} style={{ color: '#03c9d7' }} />
          <span>new task</span>
        </Space>
      ),
      key: '0',
    },
    {
      label: (
        <Space>
          <FontAwesomeIcon icon={faBug} style={{ color: '#e46a76' }} />
          <span>bug</span>
        </Space>
      ),
      key: '1',
    },
  ];

  const handleSaveDescription = () => {
    dispatch(updateTaskDescriptionSagaAction(taskDetail.taskId, values.description, taskDetail.projectId));
    // set the description 's content to new value
    setFieldValue('description', contentEditor);
    // set the old value (history value) to new value
    setContentEditor(values.description);
    setIsEditingDes(false);
  };

  const handleCancelDescription = () => {
    setIsEditingDes(false);
    // set the description 's content back to old value (history value)
    setFieldValue('description', contentEditor);
  };

  const handleShowDescription = () => {
    setIsEditingDes(true);
    // update the description 's content to be the same as the api data
    setFieldValue('description', taskDetail.description);
  };

  const renderTaskName = () => {
    return (
      <>
        {isEditingName ? (
          <div className={cx('row')}>
            <div className={cx('row')}>
              <InputField
                name='taskName'
                value={values.taskName}
                error={errors.taskName}
                touched={touched.taskName}
                placeholder='Insert task name'
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <Space>
              <Button
                type='primary'
                size='small'
                onClick={() => {
                  dispatch(updateTaskSagaAction({ ...taskDetail, taskName: values.taskName }));
                  setIsEditingName(false);
                  setContentName(values.taskName);
                }}
              >
                Save
              </Button>
              <Button
                type='text'
                size='small'
                onClick={() => {
                  setFieldValue('taskName', contentName);
                  setIsEditingName(false);
                }}
              >
                Cancel
              </Button>
            </Space>
          </div>
        ) : (
          <div className={cx('row')} style={{ marginLeft: '-16px' }}>
            <Button type='text' onClick={() => setIsEditingName(true)}>
              <span className={cx('taskName')}>{contentName}</span>
            </Button>
          </div>
        )}
      </>
    );
  };

  const renderDescription = () => {
    const jsxDescription = taskDetail.description && parse(taskDetail.description);

    return (
      <>
        {isEditingDes ? (
          <div className={cx('row')}>
            <div className={cx('row')}>
              <EditorField name='description' height={250} value={values.description} onEditorChange={setFieldValue} />
            </div>
            <Space>
              <Button type='primary' size='small' onClick={handleSaveDescription}>
                Save
              </Button>
              <Button type='text' size='small' onClick={handleCancelDescription}>
                Cancel
              </Button>
            </Space>
          </div>
        ) : (
          <div style={{ minHeight: '20px' }} onClick={handleShowDescription}>
            {jsxDescription}
          </div>
        )}
      </>
    );
  };

  return (
    <div className={cx('wrapper')}>
      {/* header */}
      <div className={cx('header')}>
        {/* left header */}
        <Button type='text' style={{ color: 'var(--sub-text-color)', marginLeft: '-16px' }}>
          {taskDetail.taskTypeDetail.id === 2 ? items[0].label : items[1].label}-{taskDetail.taskId}
        </Button>

        {/* right header */}
        <Space>
          <Button type='text' icon={<SendOutlined />}>
            Give feedback
          </Button>
          <Button type='text' icon={<LinkOutlined />}>
            Copy link
          </Button>
          <Button type='text' icon={<DeleteOutlined />} />
        </Space>
      </div>

      {/* body */}
      <Row gutter={[24, 16]}>
        {/* Leftside */}
        <Col xs={24} md={15}>
          {/* content */}
          <Card style={{ marginBottom: '20px' }}>
            <div className={cx('row')}>{renderTaskName()}</div>

            <div className={cx('row')}>
              <p className={cx('description')}>Desciption</p>
              {renderDescription()}
            </div>
          </Card>

          {/* comment */}
          <CommentBoard taskDetail={taskDetail} />
        </Col>

        {/* Rightside */}
        <Col xs={24} md={9}>
          <Card>
            {/* Status */}
            <div className={cx('row')}>
              <SelectField
                label='Status'
                name='statusId'
                value={values.statusId}
                error={errors.statusId}
                touched={touched.statusId}
                onChange={handleChange}
                onBlur={handleBlur}
                list={statusList}
                listLabel='statusName'
                listValue='statusId'
                // dispatch action-saga
                api={true}
                taskDetail={taskDetail}
              />
            </div>

            {/* Priority */}
            <div className={cx('row')}>
              <SelectField
                label='Priority'
                name='priorityId'
                value={values.priorityId}
                error={errors.priorityId}
                touched={touched.priorityId}
                placeholder='Select priority'
                onChange={handleChange}
                onBlur={handleBlur}
                list={priorityList}
                listLabel='priority'
                listValue='priorityId'
                // dispatch action-saga
                api={true}
                taskDetail={taskDetail}
              />
            </div>

            {/* Member */}
            <div className={cx('row')}>
              <SelectField
                label='Assign user'
                name='listUserAsign'
                value={values.listUserAsign}
                defaultValue={values.listUserAsign}
                error={errors.listUserAsign}
                touched={touched.listUserAsign}
                onChange={handleChange}
                onBlur={handleBlur}
                list={projectDetail.members}
                listLabel='name'
                listValue='userId'
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                mode='multiple'
                showSearch
                allowClear
              />
            </div>

            {/* Time tracking */}
            <Popover
              content={
                <>
                  <InputField
                    label='Time spent (hours)'
                    name='timeTrackingSpent'
                    type='number'
                    value={values.timeTrackingSpent}
                    error={errors.timeTrackingSpent}
                    touched={touched.timeTrackingSpent}
                    placeholder='Insert time spent'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min={0}
                  />
                  <div style={{ marginTop: '8px' }}>
                    <InputField
                      label='Time remaining (hours)'
                      name='timeTrackingRemaining'
                      type='number'
                      value={values.timeTrackingRemaining}
                      error={errors.timeTrackingRemaining}
                      touched={touched.timeTrackingRemaining}
                      placeholder='Insert time remaning'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      min={0}
                    />
                  </div>
                  <div style={{ marginTop: '8px', textAlign: 'end' }}>
                    <Button
                      type='primary'
                      onClick={() => {
                        dispatch(
                          updateTimeTrackingSagaAction(
                            taskDetail.taskId,
                            values.timeTrackingSpent,
                            values.timeTrackingRemaining,
                            projectDetail.id
                          )
                        );
                        setOpenTracking(false);
                      }}
                    >
                      Done
                    </Button>
                  </div>
                </>
              }
              trigger='click'
              open={openTracking}
              onOpenChange={(e) => setOpenTracking(e)}
            >
              <div className={cx('row')}>
                <SliderField
                  label='Time Tracking'
                  name='timeTrackingSpent'
                  spentValue={values.timeTrackingSpent}
                  remainValue={values.timeTrackingRemaining}
                  onChange={handleChange}
                  api={true}
                  taskDetail={taskDetail}
                />
              </div>
            </Popover>
          </Card>

          <Divider />

          {/* time */}
          <div style={{ color: '#929398' }}>Create at a month ago</div>
          <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
        </Col>
      </Row>
    </div>
  );
}
