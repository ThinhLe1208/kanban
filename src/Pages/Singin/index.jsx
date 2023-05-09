import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { signinSagaAction } from 'redux/sagas/actions/userAction';

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
      console.log(values);
      dispatch(signinSagaAction(values.email, values.passWord, isRemember));
    },
  });

  return (
    <div className={cx('wrapper')}>
      <Card className={cx('card')}>
        <form className={cx('form')} onSubmit={handleSubmit}>
          <h1 className={cx('header')}>Sign in</h1>

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

            <Checkbox checked={isRemember} onChange={() => setIsRemember(!isRemember)}>
              Remember me
            </Checkbox>

            <Button type='primary' block htmlType='submit'>
              Sign in
            </Button>

            <div className={cx('links')}>
              <Button type='link'>Forgot password</Button>
              <Button type='link'>Create an account</Button>
            </div>
          </div>

          <div className={cx('footer')}>
            <p className={cx('title')}>Or sign in with</p>

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
