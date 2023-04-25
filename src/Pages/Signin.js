import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Input, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signinAction } from '../redux/saga/actions/UserAction';
import LoadingComponent from '../Components/GlobalSetting/LoadingComponent/LoadingComponent';

const { Title } = Typography;

const SigninSchema = Yup.object().shape({
    email: Yup
        .string()
        .email('Invalid email')
        .required('Field is required'),
    password: Yup
        .string()
        .min(6, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Field is required'),
});

export default function Signin() {
    let { isLoading } = useSelector(state => state.LoadingReducer);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        // validationSchema: SigninSchema,
        onSubmit: values => {
            dispatch(signinAction(values.email, values.password));
        },
    });

    return (
        <div className='d-flex flex-column justify-content-center h-100'>
            <Title className='text-center mb-4'>Sign In Jira</Title>
            <form
                onSubmit={formik.handleSubmit}
                className='d-flex flex-column row-gap-3 mx-auto'
                style={{ width: '80%' }}
            >
                <Input value={formik.values.email} onChange={formik.handleChange} name="email" prefix={<UserOutlined />} />
                <div className="text-danger">{formik.errors.email}</div>
                <Input.Password value={formik.values.password} onChange={formik.handleChange} name="password" prefix={<LockOutlined />} />
                <div className="text-danger">{formik.errors.password}</div>

                <Checkbox>Remember me</Checkbox>

                <Button type="primary" htmlType="submit">
                    Sign In
                </Button>

                {isLoading && <LoadingComponent />}
            </form>
        </div>
    );
}