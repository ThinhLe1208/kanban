import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames/bind';

import styles from './ProjectCreate.module.scss';
import { createProjectSagaAction } from 'redux/saga/actions/projectAction';
import Heading from 'components/Heading/Heading';
import InputField from 'components/InputField/InputField';
import EditorField from 'components/EditorField/EditorField';
import SelectField from 'components/SelectField/SelectField';
import Card from 'components/Card/Card';

const cx = classNames.bind(styles);

const breadCrumbList = [
    {
        href: '/',
        title: 'Home',
    },
    {
        href: '/project',
        title: 'Project',
    },
    {
        title: 'Create Project',
    }
];

const CreateProjectSchema = Yup.object().shape({
    projectName: Yup.string().required('Please provide an issue name.'),
    categoryId: Yup.number().required('Please select a type.'),
});

export default function ProjectCreate() {
    const dispatch = useDispatch();

    // get projectCategoryArr from redux store
    const { projectCategoryArr } = useSelector(state => state.projectCategoryReducer);

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
            projectName: '',
            description: '',
            categoryId: null,
        },
        validationSchema: CreateProjectSchema,
        onSubmit: (values) => {
            dispatch(createProjectSagaAction(values));
        },
    });

    return (
        <div className={cx(`wrapper`)}>

            <div className={cx(`heading`)}>
                <Heading breadCrumbList={breadCrumbList} title={'Create Project'} />
            </div>

            <Card className={cx(`card`)}>
                <form className={cx(`form`)} onSubmit={handleSubmit}>

                    <div className={cx("row")}>
                        <InputField
                            label='Project name'
                            name="projectName"
                            value={values.projectName}
                            error={errors.projectName}
                            touched={touched.projectName}
                            placeholder="Insert project name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className={cx("row")}>
                        <EditorField
                            label='Desciption'
                            name='description'
                            height={250}
                            value={values.description}
                            onEditorChange={setFieldValue}
                        />
                    </div>

                    <div className={cx("row")}>
                        <SelectField
                            label='Project Category'
                            name="categoryId"
                            value={values.categoryId}
                            error={errors.categoryId}
                            touched={touched.categoryId}
                            placeholder="Select priority"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            list={projectCategoryArr}
                            listLabel='projectCategoryName'
                            listValue='id'
                        />
                    </div>

                    <div className={cx(`row`, 'buttons')}>
                        <Button type='default'>Cancel</Button>
                        <Button type='primary' htmlType='submit'>Create</Button>
                    </div>

                </form>
            </Card>
        </div >
    );
}
