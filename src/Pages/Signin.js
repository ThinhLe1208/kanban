import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Typography } from 'antd';
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { signinSagaAction } from 'redux/saga/actions/userAction';

const { Title } = Typography;

const SigninSchema = Yup.object().shape({
    email: Yup
        .string()
        // .email('Invalid email')
        .required('Field is required'),
    password: Yup
        .string()
        .min(4, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Field is required'),
    type: Yup
        .number()
        .required('Field is required')
});

export default function Signin() {
    const dispatch = useDispatch();

    const initialValues = {
        email: '',
        password: '',
        type: null
    };

    return (
        <div className='d-flex flex-column justify-content-center h-100 px-5'>
            <Title className='text-center text-primary mb-4'>Jira Clone</Title>

            {/* <Formik
                initialValues={initialValues}
                validationSchema={SigninSchema}
                onSubmit={(values) => {
                    dispatch(signinSagaAction(values.email, values.password));
                }}
            >
                {formikProps => {

                    return (
                        <Form>
                            <FastField
                                name='email'
                                component={InputField}

                                // Formik set automatically these props to the InputField compontent
                                type='text'
                                label='Email'
                                placeholder='email@gmail.com'
                            />

                            <FastField
                                name='password'
                                component={InputField}

                                type='password'
                                label='Password'
                                placeholder='password'
                            />

                            <FastField
                                name='type'
                                component={SelectField}

                                type='select'
                                label='Type'
                                placeholder='What is your job?'
                                options={[
                                    { value: 1, label: 'Developer' },
                                    { value: 2, label: 'Student' },
                                    { value: 3, label: 'Designer' },
                                ]}
                            />

                            <Button type="primary" htmlType="submit">
                                Sign In
                            </Button>

                        </Form>
                    );
                }}
            </Formik> */}
        </div >
    );
}