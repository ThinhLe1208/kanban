import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import { CURRENT_USER, REMEMBER_USER } from 'util/constants/settingSystem';
import { showNotification } from 'util/notification';

const cx = classNames.bind(styles);

export default function AuthenticationTemplate() {
  // check the user 's remember status
  if (localStorage.getItem(CURRENT_USER) && !!localStorage.getItem(REMEMBER_USER)) {
    showNotification('info', 'You may need to log out !'); // error
    return <Navigate to='/project/management' replace={true} />;
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('leftSide')}>
        <img src={require('assets/images/auth_background.svg').default} alt='img' />
      </div>

      <div className={cx('rightSide')}>
        <Outlet />
      </div>
    </div>
  );
}
