import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Button } from 'antd';
import { FastField, Field, Form, Formik } from 'formik';
// import * as Yup from 'yup';

import { getProjectCategorySagaAction } from 'redux/saga/actions/projectCategoryAction';
import { createProjectSagaAction } from 'redux/saga/actions/projectAction';

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

// const CreateProjectSchema = Yup.object().shape({
//     email: Yup
//         .string()
//         // .email('Invalid email')
//         .required('Field is required'),
//     password: Yup
//         .string()
//         .min(4, 'Too Short!')
//         .max(20, 'Too Long!')
//         .required('Field is required'),
//     type: Yup
//         .number()
//         .required('Field is required')
// });

export default function ProjectCreate() {
    const dispatch = useDispatch();

    // timmyMCE Editor
    const initialEditorValue = '';
    const [valueEditor, setValueEditor] = useState(initialEditorValue);

    // get projectCategoryArr from redux store
    const { projectCategoryArr } = useSelector(state => state.projectCategoryReducer);

    // Formik
    const initialValues = {
        projectName: '',
        description: '',
        categoryId: null
    };

    useEffect(() => {
        // call api to get projectCategory
        dispatch(getProjectCategorySagaAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container py-3">
            <Breadcrumb
                items={breadCrumbList}
            />

            <h1 className='fs-1 mt-3 mb-4'>Create Project</h1>

            {/* <Formik
                initialValues={initialValues}
                // validationSchema={CreateProjectSchema}
                onSubmit={(values, actions) => {
                    dispatch(createProjectSagaAction(values));
                }}
            >
                {formikProps => {

                    return (
                        <Form>
                            <FastField
                                name='projectName'
                                component={InputField}

                                // Formik set automatically these props to the InputField compontent
                                type='text'
                                label='Name'
                                placeholder=''
                            />

                            <Editor
                                name='description'

                                apiKey='64iv1bamj3ly5fr482iq34ud6xb2ebvhmf30hyzbx11eauzq'
                                initialValue={initialEditorValue}
                                value={valueEditor}
                                onEditorChange={(newValue) => {
                                    formikProps.setFieldValue('description', newValue);
                                    setValueEditor(newValue);
                                }}
                                init={{
                                    height: 300,
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

                            <Field
                                name='categoryId'
                                component={SelectField}

                                type='select'
                                label='Project Category'
                                placeholder='What is your project category?'
                                options={projectCategoryArr.map(p => ({ value: p.id, label: p.projectCategoryName }))}
                            />

                            <Button
                                type="primary"
                                htmlType="submit"

                            >
                                Create project
                            </Button>

                        </Form>
                    );
                }}
            </Formik> */}
        </div>
    );
}
