import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import { Avatar, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faEnvelope, faIdCard, faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, CURRENT_USER, REMEMBER_USER } from 'util/constants/settingSystem';
import { showNotification } from 'util/notification';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

export default function UserPopover({ currentUser }) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(CURRENT_USER);
    localStorage.removeItem(REMEMBER_USER);
    navigate('/signin');
    showNotification('success', 'Log out successfully !');
  };

  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('title')}>User Profile</h3>

      <div className={cx('row', 'heading')}>
        <Avatar className={cx('avatar')} src={currentUser.avatar} />
        <div className={cx('content')}>
          <h3>{currentUser.name}</h3>
          <p>Administrator</p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} />
            <span className={cx('detail')}>{currentUser.email}</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} />
            <span className={cx('detail')}>{currentUser.phoneNumber}</span>
          </p>
        </div>
      </div>

      <div className={cx('row')}>
        <div className={cx('icon')}>
          <FontAwesomeIcon icon={faIdCard} />
        </div>
        <div className={cx('content')}>
          <h3>My Profile</h3>
          <p>Account Settings</p>
        </div>
      </div>

      <div className={cx('row')}>
        <div className={cx('icon')}>
          <FontAwesomeIcon icon={faComments} />
        </div>
        <div className={cx('content')}>
          <h3>My Inbox</h3>
          <p>Messages & Emails</p>
        </div>
      </div>

      <div className={cx('row')}>
        <div className={cx('icon')}>
          <FontAwesomeIcon icon={faRectangleList} />
        </div>
        <div className={cx('content')}>
          <h3>My Tasks</h3>
          <p>To-do and Daily Tasks</p>
        </div>
      </div>

      <Button type='primary' block onClick={handleLogOut}>
        Log Out
      </Button>
    </div>
  );
}
