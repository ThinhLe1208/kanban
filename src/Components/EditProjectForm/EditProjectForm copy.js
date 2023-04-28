import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FastField, Field, Form, Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';

import InputField from 'customFields/InputField/InputField';
import SelectField from 'customFields/SelectField/SelectField';
import { Editor } from '@tinymce/tinymce-react';
import { getProjectCategorySagaAction } from 'redux/saga/actions/ProjectCategoryAction';
import { setHandleSubmitDrawer } from 'redux/reducers/DrawerReducer';

const EditProjectSchema = Yup.object().shape({
    projectName: Yup
        .string()
        .min(4, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Field is required'),
    description: Yup
        .string()
        .min(4, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Field is required'),
    categoryId: Yup
        .number()
        .required('Field is required')
});

export default function EditProjectForm() {
    const dispatch = useDispatch();
    const values = useFormikContext();
    console.log(values);

    // get projectCategoryArr from redux store
    const { projectCategoryArr } = useSelector(state => state.ProjectCategoryReducer);
    const { editProject } = useSelector(state => state.ProjectReducer);

    // timmyMCE Editor
    const initialEditorValue = editProject.description;
    const [valueEditor, setValueEditor] = useState(initialEditorValue);

    // Formik
    const initialValues = {
        projectName: editProject.projectName,
        description: editProject.description,
        categoryId: editProject.categoryId
    };

    const handleSubmitEditForm = (values, actions) => {
        console.log('edit');
        console.log(actions);
    };

    useEffect(() => {
        // call api to get projectCategory
        dispatch(getProjectCategorySagaAction());
        // dispatch submit handler to redux-toolkit store
        dispatch(setHandleSubmitDrawer(handleSubmitEditForm));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container py-3">
            <Formik
                initialValues={initialValues}
                validationSchema={EditProjectSchema}
                onSubmit={handleSubmitEditForm}
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

                            <button>click</button>

                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}
