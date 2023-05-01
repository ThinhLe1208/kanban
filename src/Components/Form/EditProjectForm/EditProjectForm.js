import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';

import { getProjectCategorySagaAction } from 'redux/saga/actions/projectCategoryAction';
import { setHandleSubmitDrawer } from 'redux/reducers/drawerReducer';
import { updateProjectSagaAction } from 'redux/saga/actions/projectAction';

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

    // get projectCategoryArr from redux store
    const { projectCategoryArr } = useSelector(state => state.projectCategoryReducer);
    const { projectEdit } = useSelector(state => state.projectReducer);

    // Formik
    const {
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur
    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            projectName: projectEdit.projectName,
            description: projectEdit.description,
            categoryId: projectEdit.categoryId
        },
        validationSchema: EditProjectSchema,
        onSubmit: (values) => {
            const { projectName, description, categoryId } = values;
            const updatedProject = {
                id: projectEdit.id,
                projectName,
                creator: 0,
                description,
                categoryId
            };
            dispatch(updateProjectSagaAction(updatedProject));
        },
    });

    useEffect(() => {
        // call api to get projectCategory
        dispatch(getProjectCategorySagaAction());
        // dispatch submit handler to redux-toolkit store
        dispatch(setHandleSubmitDrawer(handleSubmit));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container py-3">
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for='projectName'>Name</Label>

                    <Input
                        type="text"
                        id="projectName"
                        name="projectName"
                        placeholder=""
                        value={values.projectName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={errors.projectName && touched.projectName}
                    />

                    {errors.projectName && touched.projectName && <FormFeedback >{errors.projectName}</FormFeedback>}
                </FormGroup>

                <p>Desciption</p>
                <Editor
                    name='description'

                    apiKey='64iv1bamj3ly5fr482iq34ud6xb2ebvhmf30hyzbx11eauzq'
                    value={values.description}
                    onEditorChange={(value) => {
                        handleChange({ target: { name: 'description', value: value } });
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

                <FormGroup>
                    <Label for='categoryId'>Project Category</Label>

                    <Input
                        type="select"
                        id="categoryId"
                        name="categoryId"
                        value={values.categoryId}
                        onChange={handleChange}
                        onBlur={handleBlur}

                        className={errors.categoryId ? 'is-invalid' : ''}
                    >
                        {projectCategoryArr.map(p => <option key={p.id} value={p.id}>{p.projectCategoryName}</option>)}
                    </Input>

                    {errors.categoryId && <FormFeedback >{errors.categoryId}</FormFeedback>}
                </FormGroup>
            </form>
        </div>
    );
}
