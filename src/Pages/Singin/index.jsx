import React, { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { GoogleOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import InputField from 'components/InputField';
import Card from 'components/Card';
import { signInSagaAction } from 'redux/sagas/actions/userAction';
import { CURRENT_USER, REMEMBER_USER } from 'util/constants/settingSystem';

const cx = classNames.bind(styles);

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Please provide an valid email.').required('Please provide an email.'),
  passWord: Yup.string().min(6, 'Please enter at least 6+ characters.').required('Please provide a password.'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const [isRemember, setIsRemember] = useState(false);

  // Formik
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      email: '',
      passWord: '',
    },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      dispatch(signInSagaAction(values, isRemember));
    },
  });

  // check the user 's remember status
  if (localStorage.getItem(CURRENT_USER) && localStorage.getItem(REMEMBER_USER) === 'true') {
    return <Navigate to='/project/management' replace={true} />;
  }

  return (
    <div className={cx('wrapper')}>
      <Card className={cx('card')}>
        <form className={cx('form')} onSubmit={handleSubmit}>
          <div className={cx('header')}>
            <h3>Welcome to Bankan</h3>
            <div>
              <span className={cx('question')}>New to Bankan?</span>
              <NavLink to='signup'>
                <Button type='link'>Create an account</Button>
              </NavLink>
            </div>
          </div>

          <div className={cx('body')}>
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

            <div className={cx('checkBox')}>
              <Checkbox checked={isRemember} onChange={() => setIsRemember(!isRemember)}>
                Remember me
              </Checkbox>

              <Button type='link'>Forgot password</Button>
            </div>

            <Button type='primary' block htmlType='submit' style={{ height: '44px' }}>
              Sign In
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
