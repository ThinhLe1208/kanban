import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import { setHandleSubmitOffcanvas } from 'redux/reducers/offcanvasReducer';
import { updateProjectSagaAction } from 'redux/sagas/actions/projectAction';
import InputField from 'components/InputField';
import EditorField from 'components/EditorField';
import SelectField from 'components/SelectField';

const cx = classNames.bind(styles);

const EditProjectSchema = Yup.object().shape({
  projectName: Yup.string().required('Please provide an issue name.'),
});

export default function EditProjectForm() {
  const dispatch = useDispatch();

  // get projectEdit from redux store
  const { projectCategoryArr } = useSelector((state) => state.projectCategoryReducer);
  const { projectEdit } = useSelector((state) => state.projectReducer);
  const { projectName, description, categoryId, id } = projectEdit;

  // Formik
  const { values, errors, touched, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName,
      description,
      categoryId,
    },
    validationSchema: EditProjectSchema,
    onSubmit: (values) => {
      const updatedProject = {
        ...values,
        id,
      };
      dispatch(updateProjectSagaAction(updatedProject));
    },
  });

  useEffect(() => {
    dispatch(setHandleSubmitOffcanvas(handleSubmit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx('wrapper')}>
      <form className={cx(`form`)} onSubmit={handleSubmit}>
        <div className={cx('row')}>
          <InputField
            label='Project name'
            name='projectName'
            value={values.projectName}
            error={errors.projectName}
            touched={touched.projectName}
            placeholder='Insert project name'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className={cx('row')}>
          <EditorField
            label='Desciption'
            name='description'
            height={250}
            value={values.description}
            onEditorChange={setFieldValue}
          />
        </div>

        <div className={cx('row')}>
          <SelectField
            label='Project Category'
            name='categoryId'
            value={values.categoryId}
            error={errors.categoryId}
            touched={touched.categoryId}
            placeholder='Select priority'
            onChange={handleChange}
            onBlur={handleBlur}
            list={projectCategoryArr}
            listLabel='projectCategoryName'
            listValue='id'
          />
        </div>
      </form>
    </div>
  );
}
