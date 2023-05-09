import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className={cx('wrapper')}>
      <h3>Error</h3>
      <p>Oops ! Something went wrong.</p>
      <Button type='primary' onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </div>
  );
}
