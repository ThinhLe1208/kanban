import React from "react";
import { useEffect } from "react";
import { Col, Row } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";
import { setHandleSubmitOffcanvas } from "redux/reducers/offcanvasReducer";
import { createTaskSagaAction } from "redux/saga/actions/taskAction";
import InputField from "components/InputField";
import SelectField from "components/SelectField";
import EditorField from "components/EditorField";
import SliderField from "components/SliderField";

const cx = classNames.bind(styles);

const CreateTaskSchema = Yup.object().shape({
  taskName: Yup.string().required("Please provide an issue name."),
  priorityId: Yup.number().required("Please select a priority."),
  typeId: Yup.number().required("Please select a type."),
  statusId: Yup.number().required("Please select a status."),
});

export default function CreateTaskForm() {
  const dispatch = useDispatch();

  // connect to redux-toolkit store
  const { projectDetail } = useSelector((state) => state.projectReducer);
  const { taskTypeList } = useSelector((state) => state.taskTypeReducer);
  const { priorityList } = useSelector((state) => state.priorityReducer);
  const { statusList } = useSelector((state) => state.statusReducer);

  // Formik
  const { values, errors, touched, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: {
      taskName: "",
      statusId: null,
      projectId: projectDetail.id,
      priorityId: null,
      description: "",
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
        originalEstimate: values.timeTrackingSpent + values.timeTrackingRemaining,
      };
      dispatch(createTaskSagaAction(updatedValues));
    },
  });

  useEffect(() => {
    // save the submit handler form to redux-toolkit store
    dispatch(setHandleSubmitOffcanvas(handleSubmit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx("wrapper")}>
      <form onSubmit={handleSubmit}>
        <Row className={cx("row")} gutter={[18, 18]}>
          <Col xs={24} md={12}>
            <InputField
              label="Issue name"
              name="taskName"
              value={values.taskName}
              error={errors.taskName}
              touched={touched.taskName}
              placeholder="Insert task name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>

          <Col xs={24} md={12}>
            <SelectField
              label="Status"
              name="statusId"
              value={values.statusId}
              error={errors.statusId}
              touched={touched.statusId}
              placeholder="Select status"
              onChange={handleChange}
              onBlur={handleBlur}
              list={statusList}
              listLabel="statusName"
              listValue="statusId"
            />
          </Col>
        </Row>

        <Row className={cx("row")} gutter={[18, 18]}>
          <Col xs={24} md={12}>
            <SelectField
              label="Priority"
              name="priorityId"
              value={values.priorityId}
              error={errors.priorityId}
              touched={touched.priorityId}
              placeholder="Select priority"
              onChange={handleChange}
              onBlur={handleBlur}
              list={priorityList}
              listLabel="priority"
              listValue="priorityId"
            />
          </Col>
          <Col xs={24} md={12}>
            <SelectField
              label="Type"
              name="typeId"
              value={values.typeId}
              error={errors.typeId}
              touched={touched.typeId}
              placeholder="Select type"
              onChange={handleChange}
              onBlur={handleBlur}
              list={taskTypeList}
              listLabel="taskType"
              listValue="id"
            />
          </Col>
        </Row>

        <div className={cx("row")}>
          <EditorField
            label="Desciption"
            name="description"
            height={250}
            value={values.description}
            onEditorChange={setFieldValue}
          />
        </div>

        <div className={cx("row")}>
          <SelectField
            label="Assign user"
            name="listUserAsign"
            value={values.listUserAsign}
            error={errors.listUserAsign}
            touched={touched.listUserAsign}
            onChange={handleChange}
            onBlur={handleBlur}
            list={projectDetail.members}
            listLabel="name"
            listValue="userId"
            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            mode="multiple"
            showSearch
            allowClear
          />
        </div>

        <div className={cx("row")}>
          <SliderField
            label="Time Tracking"
            name="timeTrackingSpent"
            spentValue={values.timeTrackingSpent}
            remainValue={values.timeTrackingRemaining}
            onChange={handleChange}
          />
        </div>

        <Row className={cx("row")} gutter={[18, 18]}>
          <Col xs={24} md={12}>
            <InputField
              label="Time spent (hours)"
              name="timeTrackingSpent"
              type="number"
              value={values.timeTrackingSpent}
              error={errors.timeTrackingSpent}
              touched={touched.timeTrackingSpent}
              placeholder="Insert time spent"
              onChange={handleChange}
              onBlur={handleBlur}
              min={0}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputField
              label="Time remaining (hours)"
              name="timeTrackingRemaining"
              type="number"
              value={values.timeTrackingRemaining}
              error={errors.timeTrackingRemaining}
              touched={touched.timeTrackingRemaining}
              placeholder="Insert time remaning"
              onChange={handleChange}
              onBlur={handleBlur}
              min={0}
            />
          </Col>
        </Row>
      </form>
    </div>
  );
}
