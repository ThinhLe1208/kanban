import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { GoogleOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import InputField from 'components/InputField';
import Card from 'components/Card';
import { useDispatch } from 'react-redux';
import { signUpSagaAction } from 'redux/sagas/actions/userAction';

const cx = classNames.bind(styles);

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^([A-Za-z]+)((\s{1}[A-Za-z]+){1,})$/, 'Please provide an valid name.')
    .required('Please provide name.'),
  email: Yup.string().email('Please provide an valid email.').required('Please provide an email.'),
  passWord: Yup.string().min(6, 'Please enter at least 6+ characters.').required('Please provide a password.'),
  phoneNumber: Yup.string()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Please provide a valid phone number.')
    .required('Please provide a phone number.'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  // Formik
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      name: '',
      email: '',
      passWord: '',
      phoneNumber: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      dispatch(signUpSagaAction(values));
    },
  });

  return (
    <div className={cx('wrapper')}>
      <Card className={cx('card')}>
        <form className={cx('form')} onSubmit={handleSubmit}>
          <div className={cx('header')}>
            <h3>Welcome to Bankan</h3>
            <div>
              <span className={cx('question')}>Already have an Account?</span>
              <NavLink to='/signin'>
                <Button type='link'>Sign In</Button>
              </NavLink>
            </div>
          </div>

          <div className={cx('body')}>
            <InputField
              label='Name'
              name='name'
              value={values.name}
              error={errors.name}
              touched={touched.name}
              placeholder='Steve Paul Jobs'
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <InputField
              label='Email'
              name='email'
              value={values.email}
              error={errors.email}
              touched={touched.email}
              placeholder='example.email@gmail.com'
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <InputField
              label='Password'
              name='passWord'
              type='password'
              value={values.passWord}
              error={errors.passWord}
              touched={touched.passWord}
              placeholder='Enter at least 6+ characters'
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <InputField
              label='Phone Number'
              name='phoneNumber'
              type='phoneNumber'
              value={values.phoneNumber}
              error={errors.phoneNumber}
              touched={touched.phoneNumber}
              placeholder='+84123456789'
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Button type='primary' block htmlType='submit' style={{ height: '44px' }}>
              Sign Up
            </Button>
          </div>

          <div className={cx('footer')}>
            <p className={cx('title')}>
              <span>or sign in with</span>
            </p>

            <div className={cx('buttons')}>
              <button type='button' className={cx('button')}>
                <GoogleOutlined />
              </button>
              <button type='button' className={cx('button')}>
                <FontAwesomeIcon icon={faFacebook} />
              </button>
              <button type='button' className={cx('button')}>
                <FontAwesomeIcon icon={faApple} />
              </button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
