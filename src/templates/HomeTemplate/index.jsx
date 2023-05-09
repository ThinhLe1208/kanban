import React from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export default function HomeTemplate() {
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
